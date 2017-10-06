import { REQUEST_DISCOVER_TV_SHOWS, RECEIVE_DISCOVER_TV_SHOWS } from "../constants/index";
import { TvShowsDiscoverState } from "../types/index";
import { DiscoverTvShowsAction } from "../actions/index";

const DEFAULT_STATE: TvShowsDiscoverState = {
    isFetching: false,
    tvShows: []
}

export default function tvShowsDiscover(
    state: TvShowsDiscoverState = DEFAULT_STATE,
    action: DiscoverTvShowsAction
) {
    switch (action.type) {
        case REQUEST_DISCOVER_TV_SHOWS:
            return {
                ...state,
                isFetching: true,
                tvShows: []
            };
        case RECEIVE_DISCOVER_TV_SHOWS:
            return {
                ...state,
                isFetching: false,
                tvShows: action.tvShows
            }
    }

    return state;
}
