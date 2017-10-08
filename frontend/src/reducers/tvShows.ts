import { REQUEST_TV_SHOW, RECEIVE_TV_SHOW } from '../constants/index';
import { TvShowsState } from '../types/index';
import { TvShowAction } from '../actions/index';

const DEFAULT_STATE: TvShowsState = {
    shows: {},
    isFetching: false
};

export default function tvShowsDiscover(
    state: TvShowsState = DEFAULT_STATE,
    action: TvShowAction
) {
    switch (action.type) {
        case REQUEST_TV_SHOW:
            return {
                ...state,
                isFetching: true // FIXME: potentially wrong (concurrent requests for shows...)
            };
        case RECEIVE_TV_SHOW:
            return {
                ...state,
                isFetching: false,
                shows: {
                    ...state.shows,
                    [action.tvShow.id]: action.tvShow
                }
            };
        default:
            return state;
    }
}
