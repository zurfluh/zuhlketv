import { Dispatch } from 'react-redux';
import { apiError } from '.';
import TvShowsService, { TvShowResult, TvShow } from '../services/TvShowsService';
import * as constants from '../constants';

export interface RequestDiscoverTvShowsAction {
    type: constants.REQUEST_DISCOVER_TV_SHOWS;
}

export interface ReceiveDiscoverTvShowsAction {
    type: constants.RECEIVE_DISCOVER_TV_SHOWS;
    tvShows: TvShow[];
    hasMore: boolean;
}

export type DiscoverTvShowsAction = RequestDiscoverTvShowsAction | ReceiveDiscoverTvShowsAction;

export const requestDiscoverTvShows = (): RequestDiscoverTvShowsAction => ({
    type: constants.REQUEST_DISCOVER_TV_SHOWS
});

export const receiveDiscoverTvShows = (tvShowResults: TvShowResult): ReceiveDiscoverTvShowsAction => ({
    type: constants.RECEIVE_DISCOVER_TV_SHOWS,
    tvShows: tvShowResults.results,
    hasMore: tvShowResults.page < tvShowResults.total_pages,
});

export interface DiscoverFilter {
    page?: number;
}

export const fetchDiscoverTvShows = (filter: DiscoverFilter) =>
    (dispatch: Dispatch<DiscoverTvShowsAction>) => {
        dispatch(requestDiscoverTvShows());

        return TvShowsService.discoverTvShows({
            page: filter.page
        })
            .then(res => dispatch(receiveDiscoverTvShows(res)))
            .catch(err => dispatch(apiError(err)));
    };
