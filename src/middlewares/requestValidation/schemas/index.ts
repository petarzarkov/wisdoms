import { Schema } from "jsonschema";
import { getWisdomSchema } from "./getWisdomSchema";

export const schemas: { [key in string]: Schema } = {
    getWisdom: getWisdomSchema
};
