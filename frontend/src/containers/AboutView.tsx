import * as React from  'react'
import { fetchDiscoverTvShows, DiscoverTvShowsAction } from '../actions/';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';


interface AboutViewProps {

}

function AboutView(props: AboutViewProps): JSX.Element {
    return (
        <div>
            <h1>About</h1>
        </div>
    );
}

export function mapStateToProps({ tvShowsDiscover }: StoreState) {
    return {
        isFetching: tvShowsDiscover.isFetching,
        tvShows: tvShowsDiscover.tvShows,
        hasMore: tvShowsDiscover.hasMore,
    }
}

export function mapDispatchToProps(dispatch: Dispatch<DiscoverTvShowsAction>) {
    return bindActionCreators({ fetchDiscoverTvShows }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutView);
