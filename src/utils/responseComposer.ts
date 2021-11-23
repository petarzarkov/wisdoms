
import { Context, Request } from "koa";
import { buildResponse, errorResponse, successResponse } from "./responseBuilder";

export const responseComposer = <T, R>(handler: (request: T) => Promise<R>) => {
    return async (ctx: Context) => {
        const req = {...(ctx.request as Request).body, ...(ctx.request as Request).query } as T;
        console.log(`<-- ${ctx.method} ${ctx.path} Received request -`, JSON.stringify({ args: req, method: ctx.method, event: ctx.state.reqType }));
        try {
            buildResponse(ctx, successResponse(ctx, await handler(req)));
        } catch (error) {
            console.error(`Error raised on ${ctx.path} request`, JSON.stringify({ err: <Error>error }));
            buildResponse(ctx, errorResponse(ctx));
        }
    };
};
