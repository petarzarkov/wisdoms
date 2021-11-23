/* eslint-disable @typescript-eslint/ban-types */
export type ErrorParams = { err: Error } & MessageParams;
export type MessageParams = { [key: string]: string | number | boolean | object | undefined };
export type TemplateTokens = (string | number | boolean | object)[];

export interface IAppLogger {
    trace(message: string, params?: MessageParams, ...templateTokens: TemplateTokens): void;
    info(message: string, params?: MessageParams, ...templateTokens: TemplateTokens): void;
    warn(message: string, params?: MessageParams, ...templateTokens: TemplateTokens): void;
    error(message: string, params: ErrorParams, ...templateTokens: TemplateTokens): void;
    fatal(message: string, params: ErrorParams, ...templateTokens: TemplateTokens): void;

    child(logName: string): IAppLogger;
}
