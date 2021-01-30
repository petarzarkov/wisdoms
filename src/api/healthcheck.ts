import { APP_NAME, VERSION } from "../utils";

export const healthcheck = async () => {
    return {
        version: VERSION,
        name: APP_NAME
    };
};
