import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { TvSeasonDetail, TvShowDetail } from '../services/TvShowsService';
import { EpisodeGuide } from '../components/EpisodeGuide';

export interface TvSeasonDetailUrlParams {
    tvShowId: string;
    seasonNumber: string;
}

export interface TvSeasonDetailOwnProps {
    show: TvShowDetail;
}

interface TvSeasonDetailProps extends TvSeasonDetailOwnProps, RouteComponentProps<TvSeasonDetailUrlParams> {
    isFetching: boolean;
    season: TvSeasonDetail | null;
    selectTvSeason: (showId: number, seasonNumber: number) => void;
}

export function TvSeasonDetail(props: TvSeasonDetailProps): JSX.Element | null {
    const seasonNumber = parseInt(props.match.params.seasonNumber, 10);
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
                selectSeason={(sn) => props.selectTvSeason(props.show.id, sn)}
            />
        </div>
    );
}
