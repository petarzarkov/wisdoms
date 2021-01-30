import { Context } from "koa";
import { StatusCodes } from "http-status-codes";

export function buildResponse<R>(ctx: Context, response: R) {
    ctx.status = ctx.status || StatusCodes.INTERNAL_SERVER_ERROR;
    ctx.response.set("Content-Type", "application/json");
    ctx.body = response;
}

export function errorResponse(ctx: Context, error = "Oops! Something happened", status = StatusCodes.INTERNAL_SERVER_ERROR) {
    ctx.status = status;
    return { success: false, error };
}

export function successResponse<R>(ctx: Context, response: R) {
    ctx.status = StatusCodes.OK;
    return { sucess: true, ...response };
}
