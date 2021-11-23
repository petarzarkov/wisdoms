import { WisdomsRepository } from "../db";

export const getWisdom = async ({ lang = "bg" }: { lang?: string }) => {

    const wisdom = await WisdomsRepository.getRandom(lang);

    return {
        wisdom: wisdom?.joke,
        lang
    };
};
