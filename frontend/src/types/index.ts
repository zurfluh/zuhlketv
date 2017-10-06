import { TvShow } from "../services/DiscoverTvShowsService";


export interface StoreState {
    tvShowsDiscover: TvShowsDiscoverState;
    apiError: Error;
    user: UserState;
}


export interface TvShowsDiscoverState {
    isFetching: boolean,
    tvShows: TvShow[],
    hasMore: boolean,
}

export interface UserState {

}
