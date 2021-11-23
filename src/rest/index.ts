import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { PORT } from "../utils";
import { apiRouter } from "../routers";
import { configureStaticRoutes, StaticRoute } from "../middlewares";

export async function startKoa(): Promise<void> {
    const app = new Koa();

    app.use(bodyParser());
    const publicRoutes: StaticRoute[] = [
        { path: "/build", folder: "build" },
        { path: "/", folder: "public/app/" }
    ];

    app.use(apiRouter().routes());

    app.use(configureStaticRoutes(publicRoutes));

    app.listen(PORT, () => {
        console.log("Starting app on...", JSON.stringify({ PORT }));
    });
}
