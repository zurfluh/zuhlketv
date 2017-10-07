import { Dispatch } from 'react-redux';
import { push } from 'react-router-redux';
import { apiError } from '.';
import TvShowsService, { TvSeasonDetail } from '../services/TvShowsService';
import * as constants from '../constants';

export interface RequestTvShowSeasonAction {
    type: constants.REQUEST_TV_SEASONS;
    showId: number;
    seasonNumber: number;
}

export interface ReceiveTvShowSeasonAction {
    type: constants.RECEIVE_TV_SEASONS;
    season: TvSeasonDetail;
}

export type TvShowSeasonAction = RequestTvShowSeasonAction | ReceiveTvShowSeasonAction;

export const requestTvShowSeason = (showId: number, seasonNumber: number): TvShowSeasonAction => ({
    type: constants.REQUEST_TV_SEASONS,
    showId,
    seasonNumber
});

export const receiveTvShowSeason = (tvSeasonDetail: TvSeasonDetail): TvShowSeasonAction => ({
    type: constants.RECEIVE_TV_SEASONS,
    season: tvSeasonDetail
});

export const selectTvSeason = (showId: number, seasonNumber: number) => 
    (dispatch: Dispatch<TvShowSeasonAction>) => {
        dispatch(fetchTvShowSeason(showId, seasonNumber));
        dispatch(push(`/tv/${showId}/season/${seasonNumber}`));
    };

export const fetchTvShowSeason = (showId: number, seasonNumber: number) =>
    (dispatch: Dispatch<TvShowSeasonAction>) => {
        dispatch(requestTvShowSeason(showId, seasonNumber));

        return TvShowsService.getTvSeasonDetail(showId, seasonNumber)
            .then(res => dispatch(receiveTvShowSeason(res)))
            .catch(err => dispatch(apiError(err)));
    };
