import { Context } from "koa";
import Router from "koa-router";
import { getDadJoke, searchDadJoke } from "../api";
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

    router.get("SearchDadJoke", "/searchDadJoke", responseComposer(searchDadJoke));

    return router;
}