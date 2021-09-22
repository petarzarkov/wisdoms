import { AuthStrategyType, BasicAuthenticationOptions } from "./AuthenticationTypes";
import { DBAuthenticationService } from "./DBAuthenticationService";
import { Sequelize } from "sequelize-typescript";

export class BasicAuthenticationService extends DBAuthenticationService<BasicAuthenticationOptions> {

    async authenticateInternal({name, host, username, password, port}: BasicAuthenticationOptions): Promise<Sequelize> {
        return this.establishSequelizeConnection({ database: name, host, username, password, port});
    }

    validate(options: BasicAuthenticationOptions) {
        super.validate(options);
        if (options.strategy !== AuthStrategyType.Basic) throw new Error(`Unsupported strategy type: ${(options as { strategy: string }).strategy}`);
        if (!options.username) throw new Error("Missing or empty options parameter: username");
        if (!options.password) throw new Error("Missing or empty options parameter: password");
    }
}
