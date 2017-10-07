import * as React from 'react';
import { Header, Image, Divider, Loader, Grid, Rating, Statistic, Container, Label, List } from 'semantic-ui-react';
import { fetchTvShow, TvShowAction } from '../actions/';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RouteComponentProps, Route } from 'react-router';
import { TvShowDetail } from '../services/TvShowsService';
import { getImageUrl } from '../services/ImageService';
import TvShowSeasonDetailView, { TvShowDetailViewUrlParams } from './TvShowSeasonDetailView';

import './TvShowDetailView.css'
import { BackNavigation } from '../components/BackNavigation';

export interface TvShowDetailViewParams {
    tvShowId: number; // tv show number
}

interface TvShowDetailViewProps {
    isFetching: boolean;
    showId: number;
    show: TvShowDetail | null;
    fetchTvShow: (showId: number) => any;
}

function TvShowDetailView(props: TvShowDetailViewProps): JSX.Element | null {
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

    const TvSeasonDetail = (props: RouteComponentProps<TvShowDetailViewUrlParams>) => {
        return (
            <TvShowSeasonDetailView show={show} {...props} />
        );
    }

    return (
        <div>
            <div className='TvShowDetailBackdrop' style={{ backgroundImage: `url(${getImageUrl(show.backdrop_path, 'w1000')})` }} />
            <Container>
                <Grid stackable>
                    <Grid.Column width={5}>
                        <div className='TvShowDetailInfo'>
                            <Image src={getImageUrl(show.poster_path)} />
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
                            <Divider hidden />
                            <Header>Average Rating</Header>
                            <Rating rating={show.vote_average} maxRating={10} disabled />
                            <Header>Genres</Header>
                            <List horizontal>
                                {show.genres.map(g => (
                                    <List.Item>
                                        <Label key={g.id}>{g.name}</Label>
                                    </List.Item>
                                ))}
                            </List>
                            <div>

                            </div>
                            <Divider hidden />
                            <BackNavigation to='/' caption='Back to Overview' />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <Header>{show.name}</Header>
                        <Route
                            path="/tv/:tvShowId/season/:seasonNumber"
                            component={TvSeasonDetail}
                        />
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    );
}

export function mapStateToProps(
    { tvShows }: StoreState,
    ownProps: RouteComponentProps<TvShowDetailViewParams>
) {
    const showId = ownProps.match.params.tvShowId;
    return {
        isFetching: tvShows.isFetching,
        show: tvShows.shows[showId],
        showId
    }
}

export function mapDispatchToProps(dispatch: Dispatch<TvShowAction>) {
    return bindActionCreators({ fetchTvShow }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TvShowDetailView);
