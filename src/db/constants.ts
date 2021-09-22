import config from "config";
import { AuthenticationStrategiesOptions, AuthStrategyType } from "./auth";
import { DBNames } from "./contracts";

// DB logging
export const DB_LOGGING_ENABLED: boolean = process.env.DB_LOGGING_ENABLED ? process.env.DB_LOGGING_ENABLED === "true" : config.has("dbLoggingEnabled") ? config.get("dbLoggingEnabled") : false;

export const getWisdomsDBConfigOptions: () => AuthenticationStrategiesOptions = () => ({
    name: process.env.DB_CONFIG_NAME || config.get("db.wisdoms.name"),
    host: process.env.DB_CONFIG_HOST || config.get("db.wisdoms.host"),
    port: Number(process.env.DB_CONFIG_PORT) || config.get("db.wisdoms.port"),
    strategy: AuthStrategyType.Basic,
    username: process.env.DB_CONFIG_USER || config.get("db.wisdoms.username"),
    password: process.env.DB_CONFIG_PASS || config.get("db.wisdoms.password")
});

// DB reconnect
export const DB_CONNECTION_RETRY_INTERVAL: number = Number(process.env.DB_CONNECTION_RETRY_INTERVAL) ||
    (config.has("dbConnectionRetryInterval") && config.get("dbConnectionRetryInterval")) || 30 * 1000;

export const dbNames: DBNames[] = [];

if (config.has("db.wisdoms.name")) dbNames.push(config.get("db.wisdoms.name"));

// Sequelize pool size
export const MAX_POOL_SIZE: number = process.env.MAX_POOL_SIZE ? Number(process.env.MAX_POOL_SIZE) : config.has("dbPoolSize") ? config.get<number>("dbPoolSize") : 50;