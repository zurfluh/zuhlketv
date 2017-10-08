import { REQUEST_TV_SEASONS, RECEIVE_TV_SEASONS } from '../constants/index';
import { TvShowSeasonState } from '../types/index';
import { TvShowSeasonAction } from '../actions/index';

const DEFAULT_STATE: TvShowSeasonState = {
    selectedShowId: null,
    selectedSeason: null,
    season: null,
    isFetching: false
};

export default function seasonDetail(
    state: TvShowSeasonState = DEFAULT_STATE,
    action: TvShowSeasonAction
) {
    switch (action.type) {
        case REQUEST_TV_SEASONS:
            return {
                ...state,
                isFetching: true,
                season: null,
                selectedShowId: action.showId,
                selectedSeason: action.seasonNumber
            };
        case RECEIVE_TV_SEASONS:
            return {
                ...state,
                isFetching: false,
                season: action.season
            };
        default:
            return state;
    }
}
