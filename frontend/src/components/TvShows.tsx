import * as React from 'react';
const InfiniteScroll = require('react-infinite-scroller'); // non-conform export in this module
import { Card, Loader, Container } from 'semantic-ui-react';

import { TvShowResult } from '../services/TvShowsService';
import { TvShowCard } from './TvShowCard';
import { DiscoverTvShowsFilter, FavouritesState } from '../types/index';
import { PageFilter } from '../actions/index';

export interface Props {
    isFetching: boolean;
    tvShowResults: TvShowResult[];
    hasMore: boolean;
    favourites: FavouritesState;
    filter: DiscoverTvShowsFilter;
    // tslint:disable-next-line
    fetchDiscoverTvShows: (filter: PageFilter) => any;
    // tslint:disable-next-line
    navigateToShow: (showId: number) => any;
}

export function TvShowsOverview(props: Props): JSX.Element {
    // key that changes when filter changes => force creation of a new InfiniteScroll component
    const filterKey = `${props.filter.original_language}-${props.filter.sort}`;

    return (
        <Container>
            <InfiniteScroll
                initialLoad={true}
                loadMore={(page: number) => props.fetchDiscoverTvShows({ page })}
                hasMore={props.hasMore}
                loader={<Loader active={props.isFetching} />}
                threshold={1000}
                key={filterKey}
            >
                <Card.Group>
                    {props.tvShowResults.map(t => t.results).reduce((t1, t2) => (t1.concat(t2)), []).map(t => (
                        <TvShowCard
                            show={t}
                            onClick={() => props.navigateToShow(t.id)}
                            isFavorite={props.favourites[t.id] || false}
                            key={t.id}
                        />
                    ))}
                </Card.Group>
            </InfiniteScroll>
        </Container>
    );
}
