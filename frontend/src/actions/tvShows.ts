import { Dispatch } from 'react-redux';
import { apiError, fetchTvShowSeason } from '.';
import TvShowsService, { TvShowDetail } from '../services/TvShowsService';
import * as constants from '../constants';
import { push } from 'react-router-redux';

export interface RequestTvShowAction {
    type: constants.REQUEST_TV_SHOW;
    showId: number;
}

export interface ReceiveTvShowAction {
    type: constants.RECEIVE_TV_SHOW;
    tvShow: TvShowDetail;
}

export type TvShowAction = RequestTvShowAction | ReceiveTvShowAction;

export const requestTvShow = (showId: number): RequestTvShowAction => ({
    type: constants.REQUEST_TV_SHOW,
    showId
});

export const receiveTvShow = (tvShowDetail: TvShowDetail): ReceiveTvShowAction => ({
    type: constants.RECEIVE_TV_SHOW,
    tvShow: tvShowDetail
});

export const selectTvShow = (showId: number) =>
    (dispatch: Dispatch<TvShowAction>) => {
        dispatch(fetchTvShow(showId));
        // automatically navigate to season 1
        const seasonNumber = 1;
        dispatch(fetchTvShowSeason(showId, seasonNumber));
        dispatch(push(`/tv/${showId}/season/${seasonNumber}`));
    };


export const fetchTvShow = (showId: number) =>
    (dispatch: Dispatch<TvShowAction>) => {
        dispatch(requestTvShow(showId));

        return TvShowsService.getTvShowDetail(showId)
            .then(res => dispatch(receiveTvShow(res)))
            .catch(err => dispatch(apiError(err)));
    };
