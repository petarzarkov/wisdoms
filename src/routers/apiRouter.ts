import Router from "koa-router";
import { attachReqType, validateRequest } from "../middlewares";
import { healthcheck, getWisdom } from "../api";
import { responseComposer } from "../utils";

export function apiRouter(): Router {
    const router = new Router();
    router.prefix("/api/");

    router.get("Healthcheck", "/healthcheck", responseComposer(healthcheck));

    router.use(attachReqType);
    router.use(validateRequest);

    router.get("GetWisdom", "/getWisdom", responseComposer(getWisdom));

    return router;
}