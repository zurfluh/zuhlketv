import { Dispatch } from 'react-redux';
import DiscoverTvShowsService, { TvShowResult, TvShow } from '../services/DiscoverTvShowsService';
import * as constants from '../constants';

export interface Action {
    type: string;
}

export interface RequestDiscoverTvShowsAction {
    type: constants.REQUEST_DISCOVER_TV_SHOWS;
}

export interface ReceiveDiscoverTvShowsAction {
    type: constants.RECEIVE_DISCOVER_TV_SHOWS;
    tvShows: TvShow[];
    hasMore: boolean;
}

export type DiscoverTvShowsAction = RequestDiscoverTvShowsAction | ReceiveDiscoverTvShowsAction;

export interface ApiErrorAction {
    type: constants.API_CALL_ERROR;
    error: Error;
}

export const requestDiscoverTvShows = (): RequestDiscoverTvShowsAction => ({
    type: constants.REQUEST_DISCOVER_TV_SHOWS
});

export const receiveDiscoverTvShows = (tvShowResults: TvShowResult): ReceiveDiscoverTvShowsAction => ({
    type: constants.RECEIVE_DISCOVER_TV_SHOWS,
    tvShows: tvShowResults.results,
    hasMore: tvShowResults.page < tvShowResults.total_pages,
});

export const apiError = (error: Error): ApiErrorAction => ({
    type: constants.API_CALL_ERROR,
    error
});

export interface DiscoverFilter {
    page?: number;
}

export const fetchDiscoverTvShows = (filter: DiscoverFilter) =>
    (dispatch: Dispatch<DiscoverTvShowsAction>) => {
        dispatch(requestDiscoverTvShows());

        return DiscoverTvShowsService.discoverTvShows({
            page: filter.page
        })
            .then(res => dispatch(receiveDiscoverTvShows(res)))
            .catch(err => dispatch(apiError(err)));
    };
