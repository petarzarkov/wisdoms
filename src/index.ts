import { startKoa } from "./rest";

const start = async () => {
    await startKoa();
};

start().catch((err: Error) => {
    console.error("Exception raised while starting koa.", { err });
    setTimeout(() => process.exit(1), 1000);
});
