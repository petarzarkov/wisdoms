export interface Joke {
    id: string;
    joke: string;
}

export interface DadJokeResponse extends Joke {
    status: number;
}

export interface SearchDadJoke {
    current_page: number;
    limit: number;
    next_page: number;
    previous_page: number;
    results: Joke[];
    search_term: string;
    status: number;
    total_jokes: number;
    total_pages: number;
}
