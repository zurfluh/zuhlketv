import axios from 'axios';

import ConfigManager from '../config';

interface DiscoverTvQuery {
    language?: string;
    sort_by?: string;
    'air_date.gte'?: string;
    'air_date.lte'?: string;
    'first_air_date.gte'?: string;
    'first_air_date.lte'?: string;
    first_air_date_year?: number;
    page?: number;
    timezone?: string;
    'vote_average.gte'?: number;
    'vote_count.gte'?: number;
    with_genres?: string;
    with_networks?: string;
    without_genres?: string;
    'with_runtime.gte'?: number;
    'with_runtime.lte'?: number;
    include_null_first_air_dates?: boolean;
    with_original_language?: string;
    without_keywords?: string;
    screened_theatrically?: boolean;
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
    genre_ids: number[];
    original_language: string;
    vote_count: number;
    name: string;
    original_name: string;
}

export interface TvShowDetail {
    backdrop_path: string | null;
    created_by: {
        id: number;
        name: string;
        gender: number | null;
        profile_path: string;
    }[];
    episode_run_time: number[];
    first_air_date: string;
    genres: {
        id: number;
        name: string;
    }[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    name: string;
    networks: {
        id: number;
        name: string;
    }[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_countr: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: {
        id: number;
        name: string;
    }[];
    seasons: {
        air_date: string;
        episode_count: number;
        id: number;
        poster_path: string | null;
        season_number: number;
    }[];
    status: string;
    type: string;
    vote_average: number;
    vote_count: number;
}

export interface TvSeasonDetail {
    _id: number;
    air_date: string;
    episodes: {
        air_date: string;
        crew: {
            id: number;
            credit_id: number;
            name: string;
            department: string;
            job: string;
            profile_path: string | null;
        }[];
        episode_number: number;
        guest_starts: Object[];
        name: string;
        overview: string;
        id: number;
        production_code: string | null;
        season_number: number;
        still_path: string | null;
        vote_average: number;
        vote_count: number;
    }[];
    name: string;
    overview: string;
    id: number;
    poster_path: string | null;
    season_number: number;
}

const TvShowsService = {

    discoverTvShows: (query: DiscoverTvQuery): Promise<TvShowResult> => {
        return getRequest('/discover/tv', query);
    },

    getTvShowDetail: (showId: number): Promise<TvShowDetail> => {
        return getRequest(`/tv/${showId}`);
    },

    getTvSeasonDetail: (showId: number, season_number: number): Promise<TvSeasonDetail> => {
        return getRequest(`/tv/${showId}/season/${season_number}`);
    }

}

function getRequest(path: string, query: Object = {}): Promise<any> {
    return ConfigManager.getConfig().then(config => {
        return axios.get(
            config.TV_SHOWS_BASE_URL + path,
            {
                params: {
                    ...query
                }
            }
        ).then(response => response.data);
    });
}

export default TvShowsService;
