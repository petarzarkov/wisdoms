import { fetchConstructor } from "./FetchConstructor";

export const fetchServices = {
    translateWisdom: fetchConstructor<void, string>({
        url: "https://icanhazdadjoke.com/",
        options: { eventName: "dadJoke" }
    }),
};
