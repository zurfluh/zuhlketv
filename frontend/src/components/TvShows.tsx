import * as React from 'react';
import { Card, Loader, Container } from 'semantic-ui-react';
const InfiniteScroll = require('react-infinite-scroller');
import { TvShowResult } from '../services/TvShowsService';
import { TvShowCard } from './TvShowCard';

export interface Props {
    isFetching: boolean;
    tvShowResults: TvShowResult[];
    hasMore: boolean;
    fetchDiscoverTvShows: any;
    navigateToShow: (showId: number) => any;
}

export class TvShowsOverview extends React.Component<Props> {

    fetchShows(page: number) {
        this.props.fetchDiscoverTvShows({ page });
    }

    render() {
        return (
            <Container>
                <InfiniteScroll
                    initialLoad={true}
                    loadMore={this.fetchShows.bind(this)}
                    hasMore={this.props.hasMore}
                    loader={<Loader active={this.props.isFetching} />}
                    threshold={1000}
                >
                    <Card.Group>
                        {this.props.tvShowResults.map(t => t.results).reduce((t1, t2) => (t1.concat(t2)), []).map(t => (
                            <TvShowCard
                                show={t}
                                onClick={() => this.props.navigateToShow(t.id)}
                                key={t.id}
                            />
                        ))}
                    </Card.Group>
                </InfiniteScroll>
            </Container>
        );
    }
}
