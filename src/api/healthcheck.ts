import { APP_NAME, VERSION } from "../utils";
import { WisdomsRepository } from "../db";

export const healthcheck = async () => {
    const getLast = await WisdomsRepository.getLast();

    return {
        healthy: getLast.isSuccess,
        version: VERSION,
        name: APP_NAME
    };
};
