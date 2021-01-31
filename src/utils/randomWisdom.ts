import { getRandomNumber, wisdoms } from ".";

export const randomWisdom = () => {
    const first = wisdoms[getRandomNumber(wisdoms.length)];
    const second = wisdoms[getRandomNumber(wisdoms.length)];
    const third = wisdoms[getRandomNumber(wisdoms.length)];
    const final = `${first}, ${second}${getRandomNumber(2) === 2 ? `, ${third}` : ""}`.trim().toLowerCase().replace(/\.|!/g, "").replace(/\s{2,}/g, " ") + ".";

    return final[0].toUpperCase() + final.slice(1);
};
