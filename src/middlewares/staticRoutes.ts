import { Context } from "koa";
import koaSend from "koa-send";

export type StaticRoute = { path: string | RegExp; folder: string };

export function configureStaticRoutes(routes: StaticRoute[]): ((ctx: Context, next: () => Promise<void>) => Promise<void>) {
    return async (ctx: Context, next: () => Promise<void>) => {
        const route = routes.find(r => r.path instanceof RegExp ? r.path.test(ctx.request.path) : ctx.request.path.startsWith(r.path));
        if (ctx.method !== "HEAD" && ctx.method !== "GET" || route == null) {
            return next();
        }

        const resourcePath = ctx.request.path.replace(route.path, route.folder);
        let sent: string | undefined;
        try {
            sent = await koaSend(ctx, resourcePath, { index: "index.html" });
        } catch (error) {
            console.error("Exception caught in staticRoutes middleware", JSON.stringify({ err: <Error>error, data: { resourcePath, path: route.path, folder: route.folder } }));
            sent = undefined;
        }

        return sent ? undefined : next();
    };
}
