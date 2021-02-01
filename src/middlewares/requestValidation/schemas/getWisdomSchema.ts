import { Schema } from "jsonschema";

export const getWisdomSchema: Schema = {
    id: "/getWisdom",
    type: "object",
    properties: {
        lang: { type: "string", minLength: 2, maxLength: 2 }
    }
};
