import { Context } from "koa";

export async function attachReqType(ctx: Context, next: () => Promise<void>): Promise<void> {
    // eslint-disable-next-line no-useless-escape
    const matches = (ctx.request.originalUrl as string).match(/.*\/([^\?]*)/); // Match the last path parameter of the request
    ctx.state.reqType = matches ? matches[1] : (ctx.request.originalUrl as string).substring(1);
    return next();
}
