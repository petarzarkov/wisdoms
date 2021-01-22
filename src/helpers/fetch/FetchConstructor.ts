import { HttpRequest, HttpResponse, IBaseOptions } from "../../contracts";
import { fetchService } from "./fetch";

/**
* @param url www.yourbaseurl.com
* @param method e.g. "POST" defaults to "GET"
* @example const myService = fetchConstructor<{ someBodyParam: number }, { someJsonRes: string }>({
        url: "www.yoururl.com/{pathParamToReplace}",
        method: "POST"
    })
*/
export const fetchConstructor = <TRequest = void, TResponse = void>({
    url, method = "GET", payload: staticPayload, options: staticOptions }: HttpRequest<TRequest>) => async (payload?: TRequest,
    options?: IBaseOptions): Promise<HttpResponse<TResponse>> => {
    return await fetchService<TRequest, TResponse>({
        url,
        method,
        payload: payload || staticPayload,
        options: options || staticOptions
    });
};

