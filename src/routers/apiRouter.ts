import Router from "koa-router";
import { attachReqType, validateRequest } from "../middlewares";
import { healthcheck, getWisdom, postWisdom } from "../api";
import { responseComposer } from "../utils";

export function apiRouter(): Router {
    const router = new Router();
    router.prefix("/api/");

    router.get("Healthcheck", "/healthcheck", responseComposer(healthcheck));

    router.use(attachReqType);
    router.use(validateRequest);

    router.get("GetWisdom", "/getWisdom", responseComposer(getWisdom));

    router.post("GetWisdom", "/getWisdom", responseComposer(postWisdom));

    return router;
}