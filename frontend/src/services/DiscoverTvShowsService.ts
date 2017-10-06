import axios from 'axios';


// const API_KEY: string = '00e139cee8bd741b03785ab5b22aca5c';


// const TV_SHOWS_BASE_URL = 'https://api.themoviedb.org/3';
const TV_SHOWS_BASE_URL = 'http://localhost:4000';


interface DiscoverTvQuery {
    language?: string;
    sort_by?: string;
    page?: number;
    // ...
}

export interface TvShowResult {
    page: number;
    total_results: number;
    total_pages: number;
    results: TvShow[];
}

export interface TvShow {
    poster_path: string;
    populatiry: number;
    id: number; 
    backdrop_path: string | null;
    vote_average: number;
    overview: string;
    first_air_date: string;
    origin_country: string[];
    genre_ids: number[]
    original_language: string;
    vote_count: number;
    name: string;
    original_name: string;
}

const DiscoverTvShowsService = {

    discoverTvShows: (query: DiscoverTvQuery): Promise<TvShowResult> => {
        return getRequest('/discover/tv', query);
    }

}

function getRequest(path: string, query: Object = {}): Promise<any> {
    return axios.get(
        TV_SHOWS_BASE_URL + path,
        {
            params: {
                ...query
            }
        }
    ).then(response => response.data);
}

export default DiscoverTvShowsService;
