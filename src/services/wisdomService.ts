import bgWisdoms from '../bg-wisdoms.json';
import enWisdoms from '../en-wisdoms.json';

export const getRandomIndex = (l: number) => {
  return Math.floor(Math.random() * Math.floor(l)) + 1;
};

export const generateRandomWisdom = (wisdomList: string[]) => {
  const first = wisdomList[getRandomIndex(wisdomList.length)];
  const second = wisdomList[getRandomIndex(wisdomList.length)];
  const third = wisdomList[getRandomIndex(wisdomList.length)];
  const final =
    `${first}, ${second}, ${third}`
      .trim()
      .toLowerCase()
      .replace(/\.|!/g, '')
      .replace(/\s{2,}/g, ' ') + '.';

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return final[0]!.toUpperCase() + final.slice(1);
};

export const getRandomWisdom = async (language: 'bg' | 'en' = 'bg') => {
  const wisdoms = language === 'bg' ? bgWisdoms : enWisdoms;
  const wisdomsExtended = wisdoms
    .map((e: string) => e.split(','))
    .reduce((acc: string[], val: string[]) => acc.concat(val), []);

  return generateRandomWisdom(wisdomsExtended);
};
