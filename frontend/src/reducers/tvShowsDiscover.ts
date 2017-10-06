import { REQUEST_DISCOVER_TV_SHOWS, RECEIVE_DISCOVER_TV_SHOWS } from "../constants/index";
import { TvShowsDiscoverState } from "../types/index";
import { DiscoverTvShowsAction } from "../actions/index";

const DEFAULT_STATE: TvShowsDiscoverState = {
    isFetching: false,
    tvShows: [],
    hasMore: true
}

export default function tvShowsDiscover(
    state: TvShowsDiscoverState = DEFAULT_STATE,
    action: DiscoverTvShowsAction
) {
    switch (action.type) {
        case REQUEST_DISCOVER_TV_SHOWS:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_DISCOVER_TV_SHOWS:
            return {
                ...state,
                isFetching: false,
                // concat already loaded shows with newly loaded ones
                tvShows: [...state.tvShows, ...action.tvShows],
                hasMore: action.hasMore
            }
    }

    return state;
}
