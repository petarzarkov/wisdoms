import { startKoa } from "./rest";
import { connect } from "./db";
import { createLogger } from "./helpers/logger";

const log = createLogger("wisdoms-app");

const start = async () => {
    await startKoa();
    await connect();
};

start().catch((err: Error) => {
    log.error("Exception raised while starting koa.", { err });
    setTimeout(() => process.exit(1), 1000);
});
