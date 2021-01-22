export type ParamsType = { [key: string]: string | boolean | number | undefined };

export interface IBaseOptions {
    eventName?: string;
    authToken?: string;
    customHeaders?: { [key: string]: string };
    timeout?: number;
    pathParams?: ParamsType;
    queryParams?: ParamsType;
}

export type HttpRequest<TRequest> = {
    url: string;
    method?: string;
    payload?: TRequest;
    options?: IBaseOptions;
};
