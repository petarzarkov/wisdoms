import { randomWisdom, randomWisdomEn } from "../utils/randomWisdom";

export const getWisdom = async ({ lang = "bg" }: { lang?: string }) => {

    return {
        wisdom: lang === "en" ? randomWisdomEn() : randomWisdom(),
        lang
    };
};
