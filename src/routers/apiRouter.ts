import Router from "koa-router";
import { attachReqType, validateRequest } from "../middlewares";
import { getDadJoke, healthcheck, searchDadJoke } from "../api";
import { responseComposer } from "../utils";

export function apiRouter(): Router {
    const router = new Router();
    router.prefix("/api/");

    router.get("Healthcheck", "/healthcheck", responseComposer(healthcheck));

    router.get("DadJoke", "/getDadJoke", responseComposer(getDadJoke));

    router.use(attachReqType);
    router.use(validateRequest);

    router.get("SearchDadJoke", "/searchDadJoke", responseComposer(searchDadJoke));

    return router;
}