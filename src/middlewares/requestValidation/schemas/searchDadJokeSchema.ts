import { Schema } from "jsonschema";

export const searchDadJokeSchema: Schema = {
    id: "/searchDadJoke",
    type: "object",
    properties: {
        term: { type: "string", minLength: 1 },
        page: { type: "string", minLength: 1 },
        limit: { type: "string", minLength: 1 }
    },
    required: ["term"]
};
