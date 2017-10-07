import { TvShowsOverview } from '../components/TvShows';
import { fetchDiscoverTvShows } from '../actions/';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';


export function mapStateToProps({ tvShowsDiscover }: StoreState) {
    return {
        isFetching: tvShowsDiscover.isFetching,
        tvShows: tvShowsDiscover.tvShows,
        hasMore: tvShowsDiscover.hasMore,
    }
}

export function mapDispatchToProps(dispatch: Dispatch<any>) {
    return bindActionCreators({
        fetchDiscoverTvShows,
        navigateToShow: (showId: number) => push(`/tv/${showId}`)
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TvShowsOverview);
