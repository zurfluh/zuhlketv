import { TvShow, TvShowDetail, TvSeasonDetail } from "../services/TvShowsService";
import { RouterState } from 'react-router-redux';

export interface StoreState {
    tvShowsDiscover: TvShowsDiscoverState;
    tvShows: TvShowsState;
    seasonDetail: TvShowSeasonState;
    episodeDetail: TvShowEpisodeState;
    apiError: Error;
    user: UserState;
    router: RouterState;
}

export interface TvShowsDiscoverState {
    isFetching: boolean,
    tvShows: TvShow[],
    hasMore: boolean,
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

export interface UserState {

}
