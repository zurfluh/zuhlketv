import { REQUEST_DISCOVER_TV_SHOWS, RECEIVE_DISCOVER_TV_SHOWS, CHANGE_DISCOVER_FILTER } from '../constants/index';
import { TvShowsDiscoverState } from '../types/index';
import { DiscoverTvShowsAction } from '../actions/index';
import { TvShowResult } from '../services/TvShowsService';

const DEFAULT_STATE: TvShowsDiscoverState = {
    isFetching: false,
    tvShowResults: [],
    hasMore: true,
    filter: {
        sort: 'popularity.desc',
        original_language: 'en'
    }
};

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
            // concat already loaded shows with newly loaded ones
            const sortedResults = [...state.tvShowResults, action.result].sort((a: TvShowResult, b: TvShowResult) => {
                return a.page - b.page;
            });

            return {
                ...state,
                isFetching: false,
                tvShowResults: sortedResults,
                hasMore: action.hasMore
            };
        case CHANGE_DISCOVER_FILTER:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    ...action.filter
                },
                tvShowResults: [],
                hasMore: true
            };
        default:
            return state;
    }
}
