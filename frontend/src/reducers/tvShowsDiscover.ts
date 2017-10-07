import { REQUEST_DISCOVER_TV_SHOWS, RECEIVE_DISCOVER_TV_SHOWS, CHANGE_DISCOVER_FILTER } from "../constants/index";
import { TvShowsDiscoverState } from "../types/index";
import { DiscoverTvShowsAction } from "../actions/index";

const DEFAULT_STATE: TvShowsDiscoverState = {
    isFetching: false,
    tvShows: [],
    hasMore: true,
    filter: {
        sort: 'popularity.desc',
        original_language: 'en'
    }
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
        case CHANGE_DISCOVER_FILTER:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    ...action.filter
                },
                tvShows: [],
                hasMore: true
            }
    }

    return state;
}
