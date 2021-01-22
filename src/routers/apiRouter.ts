import { Context } from "koa";
import Router from "koa-router";
import { getDadJoke } from "../api/getDadJoke";
import { buildResponse, responseComposer, successResponse } from "../utils";

export function apiRouter(): Router {
    const router = new Router();
    router.prefix("/api/");

    router.get("Info", "/info", async (ctx: Context) => {
        return buildResponse(ctx, successResponse(ctx, {
            message: "All good!"
        }));
    });

    router.get("DadJoke", "/getDadJoke", responseComposer(getDadJoke));

    return router;
}