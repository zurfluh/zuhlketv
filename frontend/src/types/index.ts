
export interface StoreState {
    tvShowsDiscover: TvShowsDiscoverState;
    apiError: Error;
    user: UserState;
}


export interface TvShowsDiscoverState {
    isFetching: boolean,
    tvShows: any[],
}

export interface UserState {

}
