import { createBaseRepo } from "../../BaseRepository";
import { TblWisdoms } from "../../../../db/model";
import { IWisdomsDTO } from "./IWisdomsDTO";

function createDTOFromModel(model: TblWisdoms): IWisdomsDTO {
    return {
        id: model.id,
        name: model.name,
        joke: model.joke,
        lang: model.lang,
        params: model.params
    };
}

const wisdomsBase = createBaseRepo({ table: TblWisdoms, mapTableToDTO: createDTOFromModel, log: console });

export const WisdomsRepository = {
    ...wisdomsBase,
    getRandom: async (lang: string, requestId?: string): Promise<IWisdomsDTO | undefined> => {
        const wisdom = await wisdomsBase.getRandom({ lang }, requestId);
        return wisdom.isSuccess ? wisdom.result : undefined;
    },
};