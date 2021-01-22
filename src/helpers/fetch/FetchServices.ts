import { DadJokeResponse, SearchDadJoke } from "../../contracts";
import { fetchConstructor } from "./FetchConstructor";

export const fetchServices = {
    getDadJoke: fetchConstructor<void, DadJokeResponse>({
        url: "https://icanhazdadjoke.com/",
        options: { eventName: "dadJoke" }
    }),
    searchDadJoke: fetchConstructor<void, SearchDadJoke>({
        url: "https://icanhazdadjoke.com/search",
        options: { eventName: "searchDadJoke" }
    })
};
