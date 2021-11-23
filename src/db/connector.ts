import * as pg from "pg";
import { Sequelize } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { authenticationServiceFactory, AuthenticationStrategiesOptions, DBAuthenticationService } from "./auth";
import { dbNames, DB_CONNECTION_RETRY_INTERVAL, getWisdomsDBConfigOptions } from "./constants";
import { DBNames } from "./contracts";
import { createLogger } from "../helpers/logger";

const log = createLogger("db-connector");

// Set PostGre configuration. More info: https://github.com/brianc/node-postgres/blob/master/packages/pg/lib/defaults.js
pg.defaults.parseInt8 = true; // Parse BIGINT as integer, not as a string
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
(DataTypes as any).postgres.DECIMAL.parse = parseFloat;

let wisdomsDBService: DBAuthenticationService<AuthenticationStrategiesOptions>;

const connectWisdomsDBConfig = async (): Promise<Sequelize> => {
    const wisdomsDBOptions = getWisdomsDBConfigOptions();
    if (!wisdomsDBService) {
        wisdomsDBService = authenticationServiceFactory(DBNames.WISDOMS_DB, wisdomsDBOptions);
    }

    return wisdomsDBService.authenticate(wisdomsDBOptions);
};

const getDBConnection = (dbNames: DBNames[]): Promise<Sequelize>[] => {
    return dbNames.map(async (name) => {
        switch (name) {
            case DBNames.WISDOMS_DB: return connectWisdomsDBConfig();
            default:
                throw Error("No such DB name");
        }
    });
};

/**
 * Function atempts DB connection/s - on fail schedules a retry rather than throwing an error
 * @param onConnect - callback to be executed when DBs connection successful
 * If onConnect throws, it will schedule a retry
 */
const connect = async (onConnect?: () => Promise<void>): Promise<void> => {
    try {
        await Promise.all(getDBConnection(dbNames));
        if (onConnect) {
            await onConnect();
        }
    } catch (error) {
        const err = error as Error;
        log.error("Unable to connect DB", { err });
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        setTimeout(connect, DB_CONNECTION_RETRY_INTERVAL, onConnect);
        return;
    }
};

const getWisdomsDBSequelize = () => wisdomsDBService.getSequelize();

export {
    connect,
    getWisdomsDBSequelize
};
