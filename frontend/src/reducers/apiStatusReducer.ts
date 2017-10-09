import { API_CALL_ERROR, CLEAR_API_ERROR } from '../constants/index';
import { ApiStatusState } from '../types/index';
import { ApiStatusAction } from '../actions/index';

const DEFAULT_STATE: ApiStatusState = {
    error: null
};

export default function favourites(
    state: ApiStatusState = DEFAULT_STATE,
    action: ApiStatusAction
) {
    switch (action.type) {
        case API_CALL_ERROR:
            return {
                ...state,
                error: action.error
            };
        case CLEAR_API_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}
