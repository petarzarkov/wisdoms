import { Schema } from "jsonschema";
import { searchDadJokeSchema } from "./searchDadJokeSchema";

export const schemas: { [key in string]: Schema } = {
    searchDadJoke: searchDadJokeSchema
};
