import { RouterState } from 'react-router-redux';
import { TvShowResult, TvShowDetail, TvSeasonDetail } from '../services/TvShowsService';

export interface StoreState {
    tvShowsDiscover: TvShowsDiscoverState;
    tvShows: TvShowsState;
    seasonDetail: TvShowSeasonState;
    episodeDetail: TvShowEpisodeState;
    favourites: FavouritesState;
    apiStatus: ApiStatusState;
    router: RouterState;
}

export interface TvShowsDiscoverState {
    isFetching: boolean;
    tvShowResults: TvShowResult[];
    hasMore: boolean;
    filter: DiscoverTvShowsFilter;
}

export type DiscoverTvSortKey = 'popularity.desc' | 'vote_average.desc' | 'first_air_date.desc';
export type OriginalLanguageCode = 'en' | 'zh' | 'de';

export interface DiscoverTvShowsFilter {
    sort: DiscoverTvSortKey;
    original_language: OriginalLanguageCode;
}

export interface TvShowsState {
    // cached list of all loaded show details
    shows: {[showId: number]: TvShowDetail};
    isFetching: boolean;
}

export interface TvShowSeasonState {
    selectedShowId: number | null;
    selectedSeason: number | null;
    season: TvSeasonDetail | null;
    isFetching: boolean;
}

export interface TvShowEpisodeState {
    selectedEpisode: number | null;
}

export interface ApiStatusState {
    error: Error | null;
}

export type FavouritesState = {[showId: number]: boolean};
