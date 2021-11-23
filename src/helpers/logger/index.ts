import { AppLogger } from "./AppLogger";
import { IAppLogger } from "./IAppLogger";

export function createLogger(name: string): IAppLogger {
    return new AppLogger(name);
}