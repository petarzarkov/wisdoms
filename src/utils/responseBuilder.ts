import { Context } from "koa";
import { StatusCodes } from "http-status-codes";
import { HotLogger } from "@p.zarkov/hotstuff";

const log = HotLogger.createLogger("response-builder");

export function buildResponse<R>(ctx: Context, response: R) {
    ctx.status = ctx.status || StatusCodes.INTERNAL_SERVER_ERROR;
    ctx.response.set("Content-Type", "application/json");
    ctx.body = response;
    log.info(`--> ${ctx.method} ${ctx.path} Responding with`, { data: { response }, status: ctx.status, event: ctx.state.reqType });
}

export function errorResponse(ctx: Context, error = "Oops! Something happened", status = StatusCodes.INTERNAL_SERVER_ERROR) {
    ctx.status = status;
    return { success: false, error };
}

export function successResponse<R>(ctx: Context, response: R) {
    ctx.status = StatusCodes.OK;
    return { sucess: true, ...response };
}
