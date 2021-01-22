type LogTurn<T> = {
    message: string;
    duration?: number;
    res: T;
};

export const logAndReturn = <T>({ message, duration = 0, res }: LogTurn<T>) => {
    console.log({ message, duration });
    return res;
};
