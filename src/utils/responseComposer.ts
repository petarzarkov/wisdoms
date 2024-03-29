
import { Context, Request } from "koa";
import { buildResponse, errorResponse, successResponse } from "./responseBuilder";
import { HotLogger } from "hot-utils";

const log = HotLogger.createLogger("response-composer");

export const responseComposer = <T, R>(handler: (request: T) => Promise<R>) => {
    return async (ctx: Context) => {
        const req = {...(ctx.request as Request).body, ...(ctx.request as Request).query } as T;
        log.info(`<-- ${ctx.method} ${ctx.path} Received request`, { data: { args: req, method: ctx.method }, event: ctx.state.reqType });
        try {
            buildResponse(ctx, successResponse(ctx, await handler(req)));
        } catch (error) {
            log.error(`Error raised on ${ctx.path} request`, { err: <Error>error });
            buildResponse(ctx, errorResponse(ctx));
        }
    };
};
