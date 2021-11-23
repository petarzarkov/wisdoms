/* eslint-disable @typescript-eslint/ban-types */
import { logParams, logLevel } from "./configuration";
import { LogLevel } from "./LogLevel";
import { IAppLogger, MessageParams, ErrorParams } from "./IAppLogger";
import { LogDisplayName } from "./LogDisplayName";
import { AppLoggerMessage } from "./AppLoggerMessage";

export type LoggerParams = { [key: string]: string | number | boolean | object | Error | undefined };

export class AppLogger implements IAppLogger {
    public readonly name: string;
    public constructor(name: string) {
        this.name = name;
    }

    public info(message: string, params: MessageParams = {} as MessageParams): void {
        if (logLevel <= LogLevel.INFO) {
            const loggerMessage = this.getMessage(LogDisplayName.Information, message, params);
            console.log(JSON.stringify(loggerMessage));
        }
    }

    public trace(message: string, params: MessageParams = {} as MessageParams): void {
        if (logLevel <= LogLevel.TRACE) {
            const loggerMessage = this.getMessage(LogDisplayName.Verbose, message, params);
            console.log(JSON.stringify(loggerMessage));
        }
    }

    public warn(message: string, params: MessageParams = {} as MessageParams): void {
        if (logLevel <= LogLevel.WARN) {
            const loggerMessage = this.getMessage(LogDisplayName.Warning, message, params);
            console.log(JSON.stringify(loggerMessage));
        }
    }

    public error(message: string, params: ErrorParams = {} as ErrorParams): void {
        if (logLevel <= LogLevel.ERROR) {
            const loggerMessage = this.getMessage(LogDisplayName.Error, message, params);
            console.log(JSON.stringify(loggerMessage));
        }
    }

    public fatal(message: string, params: ErrorParams = {} as ErrorParams): void {
        if (logLevel <= LogLevel.FATAL) {
            const loggerMessage = this.getMessage(LogDisplayName.Fatal, message, params);
            console.log(JSON.stringify(loggerMessage));
        }
    }

    public child(childName: string): IAppLogger {
        if (!childName || typeof childName !== "string") {
            return this;
        }

        return new AppLogger(`${this.name}:${childName}`);
    }

    public getMessage(level: LogDisplayName, message: string, params: LoggerParams): AppLoggerMessage | undefined {
        let v: string | LoggerParams = message;
        if (typeof message === "object") {
            v = params;
            params = message;
        }

        let err: string | undefined;
        let stack: string | undefined;
        if (params.err instanceof Error) {
            if (!params.err.stack) Error.captureStackTrace(params.err);
            err = params.err.message;
            stack = params.err.stack;
        } else if (params.err && typeof params.err !== "string") {
            err = JSON.stringify(params.err);
        } else if (typeof params.err === "string") {
            const errFromString = new Error(params.err);
            if (!errFromString.stack) Error.captureStackTrace(errFromString);
            err = params.err;
            stack = errFromString.stack;
        }

        return [{
            Message: v,
            ...logParams,
            SourceContext: this.name,
            LogLevel: level,
            LogTimestamp: new Date().toISOString(),
            ...err && { ExceptionMessage: err, ...stack && { ExceptionStacktrace: stack } },
            ...params.err ? { ...params, err: undefined } : { ...params }
        }];
    }

}
