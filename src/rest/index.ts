import Koa from "koa";
import bodyParser from "koa-bodyparser";
import logger from "koa-logger";
import { apiRouter } from "../routers";

export async function startKoa(): Promise<void> {
    const app = new Koa();

    app.use(bodyParser());

    app.use(logger());

    app.use(apiRouter().routes());

    app.listen(process.env.PORT, () => {
        console.log("Starting app on...", { port: process.env.PORT });
    });
}
