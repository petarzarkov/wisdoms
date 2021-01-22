import { DadJokeRequest } from "../contracts/dadJoke/DadJokeRequest";
import { fetchServices } from "../helpers";

export const searchDadJoke = async ({ term, page, limit }: DadJokeRequest = {}) => {
    const joke = await fetchServices.searchDadJoke(undefined, { queryParams: { term, page, limit } });
    if (joke.isSuccess && joke.result?.results?.length) {
        return {
            joke: joke.result.results[0].joke
        };
    }

    return {
        joke: "No dad joke for you!"
    };
};
