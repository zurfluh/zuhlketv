import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { selectTvSeason, TvShowSeasonAction } from '../actions/';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TvSeasonDetail, TvShowDetail } from '../services/TvShowsService';
import { EpisodeGuide } from '../components/EpisodeGuide';

import './TvShowDetailView.css'


export interface TvShowDetailViewUrlParams {
    tvShowId: number;
    seasonNumber: number;
}

export interface TvShowDetailOwnProps {
    show: TvShowDetail;
}

interface TvShowSeasonDetailViewProps extends TvShowDetailOwnProps, RouteComponentProps<TvShowDetailViewUrlParams> {
    isFetching: boolean;
    season: TvSeasonDetail | null;
    selectTvSeason: (showId: number, seasonNumber: number) => any;
}

function TvShowSeasonDetailView(props: TvShowSeasonDetailViewProps): JSX.Element | null {
    const seasonNumber = props.match.params.seasonNumber;
    if (!props.season && !props.isFetching) {
        props.selectTvSeason(props.show.id, seasonNumber);
    }

    return (
        <div>
            <EpisodeGuide
                tvShow={props.show}
                selectedSeason={seasonNumber}
                season={props.season}
                isFetching={props.isFetching}
                selectSeason={(seasonNumber) => props.selectTvSeason(props.show.id, seasonNumber)}
            />
        </div>
    );
}

export function mapStateToProps(
    { seasonDetail }: StoreState,
    ownProps: TvShowDetailOwnProps & RouteComponentProps<TvShowDetailViewUrlParams>
) {
    return {
        isFetching: seasonDetail.isFetching,
        season: seasonDetail.season,
        ...ownProps
    }
}

export function mapDispatchToProps(dispatch: Dispatch<TvShowSeasonAction>) {
    return bindActionCreators({
        selectTvSeason
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TvShowSeasonDetailView);
