export type ErrorResponse<E = void> = { isSuccess: false; error: string; status?: number; result?: E };
export type SuccessResponse<T> = { isSuccess: true; result: T; status?: number };
export type Response<T> = SuccessResponse<T> | ErrorResponse<T>;