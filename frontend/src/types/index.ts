import { TvShow } from "../services/TvShowsService";
import { RouterState } from 'react-router-redux';

export interface StoreState {
    tvShowsDiscover: TvShowsDiscoverState;
    tvShows: TvShowsState;
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
    [showId: number]: TvShow;
}

export interface UserState {

}
