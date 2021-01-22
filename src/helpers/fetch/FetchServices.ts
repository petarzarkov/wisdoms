import { DadJokeResponse } from "../../contracts";
import { fetchConstructor } from "./FetchConstructor";

export const fetchServices = {
    getDadJoke: fetchConstructor<void, DadJokeResponse>({
        url: "https://icanhazdadjoke.com/",
        options: { eventName: "dadJoke" }
    })
};
