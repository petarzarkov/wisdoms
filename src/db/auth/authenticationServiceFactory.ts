import { Sequelize } from "sequelize-typescript";
import { DBAuthenticationService } from "./DBAuthenticationService";
import { BasicAuthenticationService } from "./BasicAuthenticationService";
import { AuthenticationStrategiesOptions, AuthStrategyType, BaseOptions } from "./AuthenticationTypes";
import { DBNames } from "../contracts/enums/DBNames";

export const authenticationServiceFactory = (dbModels: DBNames, options: AuthenticationStrategiesOptions, hooks?: (sq: Sequelize) => Promise<void>): DBAuthenticationService<BaseOptions> => {
    switch (options.strategy) {
        case AuthStrategyType.Basic: return new BasicAuthenticationService(dbModels, hooks);
        default: throw new Error(`Unsupported authentication strategy type ${(options as { strategy: string }).strategy}. Supported strategies: [ ${Object.keys(AuthStrategyType).join(", ")} ]`);
    }
};
