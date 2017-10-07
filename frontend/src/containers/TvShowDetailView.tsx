import * as React from 'react';
import { fetchDiscoverTvShows, DiscoverTvShowsAction } from '../actions/';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';


export interface TvShowDetailViewParams {
    id: number; // tv show number
}

interface TvShowDetailViewProps extends RouteComponentProps<TvShowDetailViewParams> {

}

function TvShowDetailView(props: TvShowDetailViewProps): JSX.Element {
    return (
        <div>
            <Link to='/'>Back</Link>
            <h1>TV Show {props.match.params.id}</h1>
        </div>
    );
}

export function mapStateToProps(
    { tvShowsDiscover }: StoreState,
    ownProps: RouteComponentProps<TvShowDetailViewParams>
) {
    return {
        ...ownProps
    }
}

export function mapDispatchToProps(dispatch: Dispatch<DiscoverTvShowsAction>) {
    return bindActionCreators({ fetchDiscoverTvShows }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TvShowDetailView);
