import { Model, Repository } from "sequelize-typescript";
import { FindOptions, NonNullFindOptions, Order, Transaction, UpdateOptions, UpsertOptions, WhereOptions } from "sequelize/types";
import { literal } from "sequelize";

interface IBaseRepo<ModelClass, ModelDTO> {
    table: Repository<ModelClass>;
    mapTableToDTO: (model: ModelClass) => ModelDTO;
    log: typeof console;
}

export interface IDataSuccessResult<T> {
    isSuccess: true;
    result: T | undefined;
}

export interface IDataErrorResult {
    isSuccess: false;
    error: Error;
}

export const withResult = <T>(data: T | undefined): IDataSuccessResult<T> => ({ isSuccess: true, result: data });
export const withError = (error: Error | unknown): IDataErrorResult => ({ isSuccess: false, error: error instanceof Error ? error : new Error(JSON.stringify(error)) });

export const createBaseRepo = <ModelClass extends Model<ModelClass, ModelDTO>, ModelDTO extends { id: number }>({
    table,
    mapTableToDTO,
    log
}: IBaseRepo<ModelClass, ModelDTO>) => {
    if (!table) {
        const error = "Missing table model, model not yet registered with sequelize!";
        log.warn(error);
        throw new Error(error);
    }

    const tableName = table?.tableName || typeof table;
    return {
        getById: async (id: number, requestId?: string): Promise<IDataSuccessResult<ModelDTO> | IDataErrorResult> => {
            try {
                const res = await table.findOne({ where: { id } });
                return withResult(res ? mapTableToDTO(res) : undefined);
            } catch (err) {
                log.error(`Error executing getById ${tableName}`, { err: <Error>err, requestId });
                return withError(err);
            }
        },
        getAll: async (requestId?: string): Promise<IDataSuccessResult<ModelDTO[]> | IDataErrorResult> => {
            try {
                return withResult((await table.findAll())?.map(mapTableToDTO));
            } catch (err) {
                log.error(`Error executing getAll ${tableName}`, { err: <Error>err, requestId });
                return withError(err);
            }
        },
        findOne: async (where: Partial<ModelDTO>, order?: Order, requestId?: string): Promise<IDataSuccessResult<ModelDTO> | IDataErrorResult> => {
            try {
                const res = await table.findOne(order ? <NonNullFindOptions<ModelClass>>{ where, order } : <NonNullFindOptions<ModelClass>>{ where });
                return withResult(res ? mapTableToDTO(res) : undefined);
            } catch (err) {
                log.error(`Error executing findOne ${tableName}`, { err: <Error>err, requestId });
                return withError(err);
            }
        },
        upsert: async (record: ModelDTO, opts: UpsertOptions<ModelClass>, requestId?: string): Promise<IDataSuccessResult<ModelDTO> | IDataErrorResult> => {
            try {
                const res = await table.upsert(record, opts);
                return withResult(res[0] ? mapTableToDTO(res[0]) : undefined);
            } catch (err) {
                log.error(`Error executing upsert ${tableName}`, { err: <Error>err, requestId });
                return withError(err);
            }
        },
        update: async (record: Partial<ModelClass>, where: Partial<ModelDTO>, transaction?: Transaction, requestId?: string): Promise<IDataSuccessResult<ModelDTO[]> | IDataErrorResult> => {
            try {
                const res = await table.update(record, transaction ? <UpdateOptions<ModelClass>>{ where, transaction, returning: true } : <UpdateOptions<ModelClass>>{ where, returning: true });
                return withResult(res[1] ? res[1].map(mapTableToDTO) : undefined);
            } catch (err) {
                log.error(`Error executing update ${tableName}`, { err: <Error>err, requestId });
                return withError(err);
            }
        },
        findAll: async (where?: Partial<ModelDTO>, order?: Order, requestId?: string): Promise<IDataSuccessResult<ModelDTO[]> | IDataErrorResult> => {
            try {
                const res = await table.findAll(order ? <FindOptions<ModelClass>>{ where, order } : <FindOptions<ModelClass>>{ where });
                return withResult(res ? res.map(mapTableToDTO) : res);
            } catch (err) {
                log.error(`Error executing findAll ${tableName}`, { err: <Error>err, requestId });
                return withError(err);
            }
        },
        count: async (where?: Partial<ModelDTO>, requestId?: string): Promise<IDataSuccessResult<number> | IDataErrorResult> => {
            try {
                const res = await table.count(<FindOptions<ModelClass>>{ where });
                return withResult(res);
            } catch (err) {
                log.error(`Error executing count ${tableName}`, { err: <Error>err, requestId });
                return withError(err);
            }
        },
        findAllCustom: async (where: WhereOptions<ModelDTO>, order?: Order, requestId?: string): Promise<IDataSuccessResult<ModelDTO[]> | IDataErrorResult> => {
            try {
                const res = await table.findAll(order ? <FindOptions<ModelClass>>{ where, order } : <FindOptions<ModelClass>>{ where });
                return withResult(res ? res.map(mapTableToDTO) : res);
            } catch (err) {
                log.error(`Error executing findAllCustom ${tableName}`, { err: <Error>err, requestId });
                return withError(err);
            }
        },
        create: async (tableDTO: Omit<ModelDTO, "id">, requestId?: string): Promise<IDataSuccessResult<ModelDTO> | IDataErrorResult> => {
            try {
                const res = await table.create(<ModelDTO>{ ...tableDTO, id: 0 });
                return withResult(res ? mapTableToDTO(res) : res);
            } catch (err) {
                log.error(`Error executing create ${tableName}`, { err: <Error>err, requestId });
                return withError(err);
            }
        },
        createBulk: async (tableDTOs: Omit<ModelDTO, "id">[], transaction?: Transaction, requestId?: string): Promise<IDataSuccessResult<ModelDTO[]> | IDataErrorResult> => {
            try {
                const res = await table.bulkCreate(<ModelDTO[]>tableDTOs, { transaction });
                return withResult(res ? res.map(mapTableToDTO) : res);
            } catch (err) {
                log.error(`Error executing createBulk ${tableName}`, { err: <Error>err, requestId });
                return withError(err);
            }
        },
        // Disable validation and hooks for bulk insertion as it slows down the query a lot
        createBulkOptimized: async (tableDTOs: Omit<ModelDTO, "id">[], transaction?: Transaction, requestId?: string): Promise<IDataSuccessResult<ModelDTO[]> | IDataErrorResult> => {
            try {
                const res = await table.bulkCreate(<ModelDTO[]>tableDTOs, { transaction, validate: false, hooks: false });
                return withResult(res ? res.map(mapTableToDTO) : res);
            } catch (err) {
                log.error(`Error executing createBulkOptimized ${tableName}`, { err: <Error>err, requestId });
                return withError(err);
            }
        },
        getLast: async (requestId?: string): Promise<IDataSuccessResult<ModelDTO> | IDataErrorResult> => {
            try {
                const res = await table.findOne({ order: [["id", "DESC"]] });
                return withResult(res ? mapTableToDTO(res) : undefined);
            } catch (err) {
                log.error(`Error executing getLast ${tableName}`, { err: <Error>err, requestId });
                return withError(err);
            }
        },
        getRandom: async (where: WhereOptions<ModelDTO>, requestId?: string): Promise<IDataSuccessResult<ModelDTO> | IDataErrorResult> => {
            try {
                const res = await table.findOne(<FindOptions<ModelClass>>{
                    where,
                    offset: literal("floor(random()*1000)") as unknown as number,
                    limit: 1
                });
                return withResult(res ? mapTableToDTO(res) : undefined);
            } catch (err) {
                log.error(`Error executing getRandom ${tableName}`, { err: <Error>err, requestId });
                return withError(err);
            }
        },
    };
};
