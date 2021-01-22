export type HttpSuccessResponse<T> = { isSuccess: true; result: T; statusCode: number };
export type HttpErrorResponse<T> = { isSuccess: false; error: string; statusCode?: number; result?: T };
export type HttpResponse<T> = HttpSuccessResponse<T> | HttpErrorResponse<T>;
