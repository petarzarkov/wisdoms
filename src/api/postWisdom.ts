import { WisdomsRepository } from "../db";

export const postWisdom = async ({ lang = "bg", id }: { lang: string; id: number }) => {

    const wisdom = !id ? await WisdomsRepository.getLast() : await WisdomsRepository.findOne({ id, lang });

    if (!wisdom.isSuccess) {
        return {
            error: "Error on fetching wisdom."
        };
    }

    return {
        message: !id ? "No Id specified, returning latest wisdom" : "OK",
        lang: wisdom?.result?.lang || lang,
        wisdom: wisdom.result || `No wisdom found by id: ${id} and lang: ${lang}`
    };
};
