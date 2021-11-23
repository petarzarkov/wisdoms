/* eslint-disable prefer-const */
import { LogLevel } from "./LogLevel";
import { NODE_ENV, LOG_LEVEL, APP_NAME, VERSION } from "../../utils/constants";

const isValidLogLevel = (level: string) => Object.keys(LogLevel).includes(level);

export let logLevel: LogLevel = LOG_LEVEL && isValidLogLevel(LOG_LEVEL) ? LogLevel[<keyof typeof LogLevel>LOG_LEVEL] : LogLevel.TRACE;

export const logParams = {
    ProcessID: process.pid,
    AppVersion: VERSION || "missing",
    AppName: APP_NAME || "missing",
    AppId: `${NODE_ENV}-${APP_NAME}`
};
