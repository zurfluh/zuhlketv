import * as constants from '../constants';

export interface Action {
    type: string;
}

export interface ApiErrorAction {
    type: constants.API_CALL_ERROR;
    error: Error;
}

export const apiError = (error: Error): ApiErrorAction => ({
    type: constants.API_CALL_ERROR,
    error
});

export * from './discoverTv';
export * from './tvShows';
export * from './tvShowSeason';
