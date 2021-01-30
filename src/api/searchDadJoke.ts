import { DadJokeRequest } from "../contracts/dadJoke/DadJokeRequest";
import { fetchServices } from "../helpers";

export const searchDadJoke = async ({ term, page, limit }: DadJokeRequest = {}) => {
    const joke = await fetchServices.searchDadJoke(undefined, { queryParams: { term, page, limit } });
    if (joke.isSuccess && joke.result?.results?.length) {
        return {
            jokes: joke.result.results
        };
    }

    return {
        joke: joke.isSuccess ? "No jokes for this term!" : "No dad joke for you!"
    };
};
