import fetch, { Response, RequestInit } from "node-fetch";
import { StatusCodes } from "http-status-codes";
import { Stopwatch } from "..";
import { HttpRequest, HttpResponse } from "../../contracts";
import { buildUrl, replacePathParams } from "../../utils";

export async function fetchService<TRequest, TResponse>(baseReq: HttpRequest<TRequest>): Promise<HttpResponse<TResponse>> {
    const { options, payload, url: baseUrl, method = "GET" } = baseReq;
    const { authToken, customHeaders, eventName, queryParams, pathParams, timeout } = options || {};
    let url = replacePathParams(baseUrl, pathParams);
    if (queryParams) {
        url = buildUrl(url, queryParams);
    }

    const requestOptions = {
        method,
        headers: method === "GET" ? { Accept: "application/json" } : { "Content-Type": "application/json" },
        timeout
    } as RequestInit;

    if (payload) {
        requestOptions.body = JSON.stringify(payload);
    }

    if (authToken) {
        (requestOptions.headers as { Accept: string; Authorization: string }).Authorization = `Bearer ${authToken}`;
    }

    if (customHeaders) {
        requestOptions.headers = { ...requestOptions.headers, ...customHeaders };
    }

    console.log(`Sending ${method} Request`, { eventName, url, data: { payload, queryParams, pathParams } });
    const sw = new Stopwatch();
    let rawResponse: Response | undefined;
    try {
        rawResponse = await fetch(url, requestOptions);
        const result = await rawResponse.json();
        if (!rawResponse.ok) {
            const message = `${method} Request unsuccessful response`;
            console.warn(message, JSON.stringify({ eventName, url, duration: sw.getElapsed(), data: { payload, result, statusCode: rawResponse.status } }));
            return { isSuccess: false, error: message, statusCode: rawResponse.status, result };
        }
        console.log(`${method} Request successful response`, JSON.stringify({
            eventName, url, duration: sw.getElapsed(), data: { payload, result, statusCode: rawResponse.status }
        }));
        return { isSuccess: true, statusCode: rawResponse.status || StatusCodes.OK, result };
    } catch (err) {
        const message = `Failed on ${method} Request`;
        console.error(message, JSON.stringify({ eventName, err: <Error>err, url, duration: sw.getElapsed(), data: { payload, statusCode: rawResponse?.status, rawResponse } }));
        return { isSuccess: false, error: (err as Error)?.message || message, statusCode: rawResponse?.status };
    }

}

