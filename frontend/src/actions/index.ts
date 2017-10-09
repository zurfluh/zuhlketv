import * as constants from '../constants';

export interface ApiErrorAction {
    type: constants.API_CALL_ERROR;
    error: Error;
}

export interface ClearApiErrorAction {
    type: constants.CLEAR_API_ERROR;
}

export type ApiStatusAction = ApiErrorAction | ClearApiErrorAction;

export const apiError = (error: Error): ApiErrorAction => ({
    type: constants.API_CALL_ERROR,
    error
});

export const clearApiError = (): ClearApiErrorAction => ({
    type: constants.CLEAR_API_ERROR
});

export * from './discoverTv';
export * from './tvShows';
export * from './tvShowSeason';
