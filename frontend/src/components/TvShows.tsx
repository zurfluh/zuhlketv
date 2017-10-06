import * as React from 'react';
import { Card, Loader } from 'semantic-ui-react';
import { TvShow } from "../services/DiscoverTvShowsService";
import { TvShowCard } from './TvShowCard';


export interface Props {
    isFetching: boolean;
    tvShows: TvShow[];
    fetchDiscoverTvShows: any;
}

export class TvShowsOverview extends React.Component<Props> {

    componentDidMount() {
        this.props.fetchDiscoverTvShows({});
    }

    render() {
        return (
            <Card.Group>
                <Loader active={this.props.isFetching} />
                {this.props.tvShows.map(t => <TvShowCard show={t} key={t.id} />)}
            </Card.Group>
        );
    }
}
