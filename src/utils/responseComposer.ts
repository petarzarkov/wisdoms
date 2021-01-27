
import { Context, Request } from "koa";
import { buildResponse, errorResponse, successResponse } from "./responseBuilder";

const errorResponseComposer = async (ctx: Context, err: Error) => {
    console.error(`Error raised on ${ctx.path} request`, { err: <Error>err });

    buildResponse(ctx, errorResponse(ctx));
};

export const responseComposer = <T, R>(handler: (request: T) => Promise<R>) => {
    return async (ctx: Context) => {
        const req = {...(ctx.request as Request).body, ...(ctx.request as Request).query } as T;
        try {
            buildResponse(ctx, successResponse(ctx, await handler(req)));
        } catch (error) {
            errorResponseComposer(ctx, error);
        }
    };
};
