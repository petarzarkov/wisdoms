import { startKoa } from "./rest";
import { connect } from "./db";

const start = async () => {
    await startKoa();
    await connect();
};

start().catch((err: Error) => {
    console.error("Exception raised while starting koa.", { err });
    setTimeout(() => process.exit(1), 1000);
});
