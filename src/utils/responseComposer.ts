
import { Context, Request } from "koa";
import { buildResponse, errorResponse } from "./responseBuilder";

const errorResponseComposer = async (ctx: Context, err: Error) => {
    console.error(`Error raised on ${ctx.path} request`,{ err: <Error>err });

    buildResponse(ctx, errorResponse(ctx));
};

export const responseComposer = <T>(handler: (request: T) => Promise<unknown>) => {
    return async (ctx: Context) => {
        const body = (ctx.request as Request).body as T;
        try {
            buildResponse(ctx, await handler(body));
        } catch (error) {
            errorResponseComposer(ctx, error);
        }
    };
};
