import { Context, Request } from "koa";
import { StatusCodes } from "http-status-codes";
import { Validator } from "jsonschema";
import { schemas } from "./schemas";
import { buildResponse, errorResponse } from "../../utils";
import { HotLogger } from "hot-utils";

const log = HotLogger.createLogger("request-validation");

const schemaKeys = Object.keys(schemas);
const validator = new Validator();
validator.schemas = schemas;

export async function validateRequest(ctx: Context, next: () => Promise<void>): Promise<void> {
    const schemaKey = schemaKeys.find(scKey => scKey === ctx.state.reqType);
    if (!schemaKey) {
        const msg = "Unsupported request type";
        log.warn(msg, { requestType: schemaKey, supported: ctx.state.reqType });
        return buildResponse(ctx, errorResponse(ctx, msg, StatusCodes.UNSUPPORTED_MEDIA_TYPE));
    }

    const req = { ...(ctx.request as Request).body, ...(ctx.request as Request).query };
    const validationRes = validator.validate(req, schemas[schemaKey]);
    if (!validationRes.valid) {
        const error = `${schemaKey}: ${validationRes.errors.map(ve => `${ve.path[0]} ${ve.message}`).join("; ")}`;
        log.warn("Invalid request format", { requestType: schemaKey, error });
        return buildResponse(ctx, errorResponse(ctx, error, StatusCodes.BAD_REQUEST));
    }

    return next();
}
