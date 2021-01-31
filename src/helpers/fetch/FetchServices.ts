import { fetchConstructor } from "./FetchConstructor";

export const fetchServices = {
    getDadJoke: fetchConstructor<void, string>({
        url: "https://icanhazdadjoke.com/",
        options: { eventName: "dadJoke" }
    }),
};
