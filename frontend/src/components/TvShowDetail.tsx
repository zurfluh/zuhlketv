import * as React from 'react';
import {
    Header, Image, Divider, Loader, Grid, Rating, Statistic, Container, Label, List, Button
} from 'semantic-ui-react';
import { RouteComponentProps, Route } from 'react-router';
import { TvSeasonDetailUrlParams } from './TvSeasonDetail';
import TvShowSeasonDetailView from '../containers/TvShowSeasonDetailView';
import { TvShowDetail } from '../services/TvShowsService';
import { getImageUrl } from '../services/ImageService';

import './TvShowDetail.css';

export interface TvShowDetailParams {
    tvShowId: number; // tv show number
}

interface TvShowDetailProps {
    isFetching: boolean;
    showId: number;
    show: TvShowDetail | null;
    isFavourite: boolean;
    fetchTvShow: (showId: number) => void;
    setFavourite: (showId: number, favourite: boolean) => void;
}

export function TvShowDetail(props: TvShowDetailProps): JSX.Element | null {
    if (!props.show && !props.isFetching) {
        // directly navigating here
        props.fetchTvShow(props.showId);
    }
    if (!props.show || props.isFetching) {
        return <Loader active />;
    }

    const show = props.show;
    const estimatedRunTimeMin = show.number_of_episodes * show.episode_run_time[0];
    const runTimeString = Math.round(estimatedRunTimeMin / 60) + ' h';

    const TvSeasonDetail = (p: RouteComponentProps<TvSeasonDetailUrlParams>) => {
        return (
            <TvShowSeasonDetailView show={show} {...p} />
        );
    };

    return (
        <div>
            <div
                className='TvShowDetailBackdrop'
                style={{ backgroundImage: `url(${getImageUrl(show.backdrop_path, 'w1000')})` }}
            />
            <Container>
                <Grid stackable>
                    <Grid.Column width={5}>
                        <div className='TvShowDetailInfo'>
                            <Image
                                label={props.isFavourite && { as: 'div', color: 'purple', corner: 'left', icon: 'heart' }}
                                src={getImageUrl(show.poster_path)}
                            />
                            <Statistic.Group widhts={2}>
                                <Statistic>
                                    <Statistic.Value>{show.number_of_episodes}</Statistic.Value>
                                    <Statistic.Label>Episodes</Statistic.Label>
                                </Statistic>
                                <Statistic>
                                    <Statistic.Value>{runTimeString}</Statistic.Value>
                                    <Statistic.Label>Run Time</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                            <FavouriteButton {...props} />
                            <Divider hidden />
                            <Header>Average Rating</Header>
                            <Rating rating={show.vote_average} maxRating={10} disabled />
                            <Header>Genres</Header>
                            <List horizontal>
                                {show.genres.map(g => (
                                    <List.Item key={g.id}>
                                        <Label>{g.name}</Label>
                                    </List.Item>
                                ))}
                            </List>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <Header>{show.name}</Header>
                        <Route
                            path='/tv/:tvShowId/season/:seasonNumber'
                            component={TvSeasonDetail}
                        />
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    );
}

function FavouriteButton(props: TvShowDetailProps): JSX.Element {
    return (
        <Button
            content={props.isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
            color={props.isFavourite ? 'orange' : 'purple'}
            icon={props.isFavourite ? 'cancel' : 'heart'}
            fluid={true}
            className='FavouriteButton'
            onClick={() => props.setFavourite(props.showId, !props.isFavourite)}
        />
    );
}
