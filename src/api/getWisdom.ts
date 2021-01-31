import { randomWisdom } from "../utils/randomWisdom";

export const getWisdom = async ({ lang = "bg" }: { lang?: string}) => {
    const wisdom = randomWisdom();

    return {
        wisdom,
        lang
    };
};
