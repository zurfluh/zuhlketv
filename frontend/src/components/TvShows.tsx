import * as React from 'react';
import { Card, Loader } from 'semantic-ui-react';
const InfiniteScroll = require('react-infinite-scroller');
import { TvShow } from "../services/TvShowsService";
import { TvShowCard } from './TvShowCard';


export interface Props {
    isFetching: boolean;
    tvShows: TvShow[];
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
            <InfiniteScroll
                initialLoad={true}
                loadMore={this.fetchShows.bind(this)}
                hasMore={this.props.hasMore}
                loader={<Loader active={this.props.isFetching} />}
            >
                <Card.Group>
                    {this.props.tvShows.map(t => (
                        <TvShowCard
                            show={t}
                            onClick={() => this.props.navigateToShow(t.id)}
                            key={t.id}
                        />
                    ))}
                </Card.Group>
            </InfiniteScroll>
        );
    }
}
