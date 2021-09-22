import { Model, Repository } from "sequelize-typescript";
import { FindOptions, NonNullFindOptions, Order, Transaction, UpdateOptions, UpsertOptions, WhereOptions } from "sequelize/types";

interface IBaseRepo<ModelClass, ModelDTO> {
    table: Repository<ModelClass>;
    mapTableToDTO: (model: ModelClass) => ModelDTO;
    log: typeof console;
}

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
        getById: async (id: number, requestId?: string): Promise<ModelDTO | undefined> => {
            try {
                const res = await table.findOne({ where: { id } });
                return res ? mapTableToDTO(res) : undefined;
            } catch (err) {
                log.error(`Error executing getById ${tableName}`, { err: <Error>err, requestId });
                return undefined;
            }
        },
        getAll: async (requestId?: string): Promise<ModelDTO[] | undefined> => {
            try {
                return (await table.findAll())?.map(mapTableToDTO);
            } catch (err) {
                log.error(`Error executing getAll ${tableName}`, { err: <Error>err, requestId });
                return undefined;
            }
        },
        findOne: async (where: Partial<ModelDTO>, order?: Order, requestId?: string): Promise<ModelDTO | undefined> => {
            try {
                const res = await table.findOne(order ? <NonNullFindOptions<ModelClass>>{ where, order } : <NonNullFindOptions<ModelClass>>{ where });
                return res ? mapTableToDTO(res) : undefined;
            } catch (err) {
                log.error(`Error executing findOne ${tableName}`, { err: <Error>err, requestId });
                return undefined;
            }
        },
        upsert: async (record: ModelDTO, opts: UpsertOptions<ModelClass>, requestId?: string): Promise<ModelDTO | undefined> => {
            try {
                const res = await table.upsert(record, opts);
                return res[0] ? mapTableToDTO(res[0]) : undefined;
            } catch (err) {
                log.error(`Error executing upsert ${tableName}`, { err: <Error>err, requestId });
                return undefined;
            }
        },
        update: async (record: Partial<ModelClass>, where: Partial<ModelDTO>, transaction?: Transaction, requestId?: string): Promise<ModelDTO[] | undefined> => {
            try {
                const res = await table.update(record, transaction ? <UpdateOptions<ModelClass>>{ where, transaction, returning: true } : <UpdateOptions<ModelClass>>{ where, returning: true });
                return res[1] ? res[1].map(mapTableToDTO) : undefined;
            } catch (err) {
                log.error(`Error executing update ${tableName}`, { err: <Error>err, requestId });
                return undefined;
            }
        },
        findAll: async (where?: Partial<ModelDTO>, order?: Order, requestId?: string): Promise<ModelDTO[] | undefined> => {
            try {
                const res = await table.findAll(order ? <FindOptions<ModelClass>>{ where, order } : <FindOptions<ModelClass>>{ where });
                return res ? res.map(mapTableToDTO) : res;
            } catch (err) {
                log.error(`Error executing findAll ${tableName}`, { err: <Error>err, requestId });
                return undefined;
            }
        },
        count: async (where?: Partial<ModelDTO>, requestId?: string): Promise<number | undefined> => {
            try {
                const res = await table.count(<FindOptions<ModelClass>>{ where });
                return res;
            } catch (err) {
                log.error(`Error executing count ${tableName}`, { err: <Error>err, requestId });
                return undefined;
            }
        },
        findAllCustom: async (where: WhereOptions<ModelDTO>, order?: Order, requestId?: string): Promise<ModelDTO[] | undefined> => {
            try {
                const res = await table.findAll(order ? <FindOptions<ModelClass>>{ where, order } : <FindOptions<ModelClass>>{ where });
                return res ? res.map(mapTableToDTO) : res;
            } catch (err) {
                log.error(`Error executing findAllCustom ${tableName}`, { err: <Error>err, requestId });
                return undefined;
            }
        },
        create: async (tableDTO: Omit<ModelDTO, "id">, requestId?: string): Promise<ModelDTO | undefined> => {
            try {
                const res = await table.create(<ModelDTO>{ ...tableDTO, id: 0 });
                return res ? mapTableToDTO(res) : res;
            } catch (err) {
                log.error(`Error executing create ${tableName}`, { err: <Error>err, requestId });
                return undefined;
            }
        },
        createBulk: async (tableDTOs: Omit<ModelDTO, "id">[], transaction?: Transaction, requestId?: string): Promise<ModelDTO[] | undefined> => {
            try {
                const res = await table.bulkCreate(<ModelDTO[]>tableDTOs, { transaction });
                return res ? res.map(mapTableToDTO) : res;
            } catch (err) {
                log.error(`Error executing createBulk ${tableName}`, { err: <Error>err, requestId });
                return undefined;
            }
        },
        // Disable validation and hooks for bulk insertion as it slows down the query a lot
        createBulkOptimized: async (tableDTOs: Omit<ModelDTO, "id">[], transaction?: Transaction, requestId?: string): Promise<ModelDTO[] | undefined> => {
            try {
                const res = await table.bulkCreate(<ModelDTO[]>tableDTOs, { transaction, validate: false, hooks: false });
                return res ? res.map(mapTableToDTO) : res;
            } catch (err) {
                log.error(`Error executing createBulkOptimized ${tableName}`, { err: <Error>err, requestId });
                return undefined;
            }
        },
        getLast: async (requestId?: string): Promise<ModelDTO | undefined> => {
            try {
                const res = await table.findOne({ order: [["id", "DESC"]] });
                return res ? mapTableToDTO(res) : undefined;
            } catch (err) {
                log.error(`Error executing getLast ${tableName}`, { err: <Error>err, requestId });
                return undefined;
            }
        }
    };
};
