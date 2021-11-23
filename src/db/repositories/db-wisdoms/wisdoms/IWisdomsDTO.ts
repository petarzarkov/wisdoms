export interface IWisdomsDTO {
    id: number;
    name: string;
    joke: string;
    lang: string;
    params: Record<string, unknown>;
}