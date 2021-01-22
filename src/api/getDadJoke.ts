import { fetchServices } from "../helpers";

export const getDadJoke = async () => {
    const joke = await fetchServices.getDadJoke();
    if (joke.isSuccess && joke.result.joke) {
        return {
            joke: joke.result.joke
        };
    }

    return {
        joke: "No dad joke for you!"
    };
};
