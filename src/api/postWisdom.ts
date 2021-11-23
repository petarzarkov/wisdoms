import { WisdomsRepository } from "../db";

export const postWisdom = async ({ lang = "bg", id }: { lang: string; id: number }) => {

    const wisdom = !id ? await WisdomsRepository.getLast() : await WisdomsRepository.findOne({ id, lang });

    return {
        message: !id ? "No Id specified, returning latest wisdom" : "OK",
        lang: wisdom?.lang || lang,
        wisdom: wisdom || `No wisdom found by id: ${id} and lang: ${lang}`
    };
};
