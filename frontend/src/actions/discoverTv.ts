import { Dispatch } from 'react-redux';
import { apiError } from '.';
import TvShowsService, { TvShowResult } from '../services/TvShowsService';
import * as constants from '../constants';
import { DiscoverTvShowsFilter, StoreState } from '../types/index';

export interface RequestDiscoverTvShowsAction {
    type: constants.REQUEST_DISCOVER_TV_SHOWS;
}

export interface ReceiveDiscoverTvShowsAction {
    type: constants.RECEIVE_DISCOVER_TV_SHOWS;
    result: TvShowResult;
    hasMore: boolean;
}

export interface ChangeDiscoverFilterAction {
    type: constants.CHANGE_DISCOVER_FILTER;
    filter: Partial<DiscoverTvShowsFilter>;
}

export type DiscoverTvShowsAction = RequestDiscoverTvShowsAction | ReceiveDiscoverTvShowsAction | ChangeDiscoverFilterAction;

export const requestDiscoverTvShows = (): RequestDiscoverTvShowsAction => ({
    type: constants.REQUEST_DISCOVER_TV_SHOWS
});

export const receiveDiscoverTvShows = (tvShowResults: TvShowResult): ReceiveDiscoverTvShowsAction => ({
    type: constants.RECEIVE_DISCOVER_TV_SHOWS,
    result: tvShowResults,
    hasMore: tvShowResults.page < tvShowResults.total_pages,
});

export const changeDiscoverFilter = (filter: Partial<DiscoverTvShowsFilter>): ChangeDiscoverFilterAction => ({
    type: constants.CHANGE_DISCOVER_FILTER,
    filter: filter
});

export const updateDiscoverFilter = (filter: Partial<DiscoverTvShowsFilter>) =>
    // FIXME: StoreState or DiscoverTvShowsAction as generic?
    (dispatch: Dispatch<StoreState>) => {
        dispatch(changeDiscoverFilter(filter));
        dispatch(fetchDiscoverTvShows({ page: 1 }));
    };

export interface PageFilter {
    page?: number;
}

export const fetchDiscoverTvShows = (filter: PageFilter) =>
    (dispatch: Dispatch<StoreState>, getState: () => StoreState) => {
        dispatch(requestDiscoverTvShows());
        const fullFilter = getState().tvShowsDiscover.filter;

        return TvShowsService.discoverTvShows({
            page: filter.page,
            sort_by: fullFilter.sort,
            with_original_language: fullFilter.original_language
        })
            .then(res => dispatch(receiveDiscoverTvShows(res)))
            .catch(err => dispatch(apiError(err)));
    };
