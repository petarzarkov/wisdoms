import { Context } from "koa";
import { StatusCodes } from "http-status-codes";

export function buildResponse<R>(ctx: Context, response: R) {
    ctx.status = ctx.status || StatusCodes.INTERNAL_SERVER_ERROR;
    ctx.response.set("Content-Type", "application/json");
    ctx.body = response;
}

export function errorResponse(ctx: Context, error = "Oops! Something happened") {
    ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
    return { error };
}

export function successResponse<R>(ctx: Context, response: R) {
    ctx.status = StatusCodes.OK;
    return {  ...response };
}
