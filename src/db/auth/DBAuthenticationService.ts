import { SequelizeOptions, Sequelize } from "sequelize-typescript";
import { DB_LOGGING_ENABLED, MAX_POOL_SIZE } from "../constants";
import { BaseOptions } from "./AuthenticationTypes";
import { DBNames } from "../contracts/enums/DBNames";

export abstract class DBAuthenticationService<O extends BaseOptions> {

    protected sequelize: Sequelize | undefined;
    private readonly dbModels: DBNames;
    private readonly hooks?: (sequelize: Sequelize) => Promise<void>;

    constructor(dbModels: DBNames, hooks?: (sequelize: Sequelize) => Promise<void>) {
        this.dbModels = dbModels;
        this.hooks = hooks;
    }

    public getSequelize(): Sequelize {
        return this.sequelize as Sequelize;
    }

    public async authenticate(options: O): Promise<Sequelize> {
        this.validate(options);
        return this.authenticateInternal(options);
    }

    protected abstract authenticateInternal(options: O): Promise<Sequelize>;

    /**
     * Validates the option values. Throw error if any of the parameters is missing or empty strings.
     * @param options
     */
    protected validate(options: O) {
        if (!options.host) throw new Error("Missing or empty options parameter: host");
        if (!options.name) throw new Error("Missing or empty options parameter: name");
        if (!options.port) throw new Error("Missing or empty options parameter: port");
    }

    protected async establishSequelizeConnection(config: SequelizeOptions): Promise<Sequelize> {
        const defaults: SequelizeOptions = {
            dialect: "postgres",
            validateOnly: false,
            models: [`${__dirname}/../model/${this.dbModels}/*.model.*`],
            pool: { max: MAX_POOL_SIZE },
            ssl: true,
            benchmark: true,
            logQueryParameters: DB_LOGGING_ENABLED,
            logging: DB_LOGGING_ENABLED ? ((query: string, duration?: number | undefined) => {
                const tableNameRgxr = query.match(/(?<=FROM )(.*)(?= AS)/g);
                const tableName = tableNameRgxr ? tableNameRgxr[0]?.replace(/\\"|"/g, "") : undefined;
                console.trace(`DB Query to ${tableName ? tableName + " " + <string>config.database : <string>config.database}`, JSON.stringify({ query, duration, tableName }));
            }) : undefined
        };
        const sequelizeConfig = { ...defaults, ...config };
        this.sequelize = new Sequelize(sequelizeConfig);

        this.sequelize.authenticate()
            .then(() => {
                console.info(`Connection has been established successfully to ${<string>config.database}.`, JSON.stringify({ data: { port: config.port, pool: sequelizeConfig.pool } }));
            })
            .catch((err: Error) => {
                console.error(`Unable to connect to the ${<string>config.database} database!`, JSON.stringify({ err, data: { port: config.port } }));
            });

        if (this.hooks) {
            await this.hooks(this.sequelize);
        }

        return this.sequelize;
    }
}
