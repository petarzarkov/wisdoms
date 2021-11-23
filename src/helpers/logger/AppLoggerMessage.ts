import { LoggerParams } from "./AppLogger";

export type AppLoggerMessage = (LoggerParams & {
    SourceContext: string;
    Message: string | LoggerParams;
    LogLevel: string;
    LogTimestamp: string;
    ExceptionMessage?: string;
    ExceptionStacktrace?: string;
})[];