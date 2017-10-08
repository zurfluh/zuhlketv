import { TvShowsOverview } from '../components/TvShows';
import { fetchDiscoverTvShows, selectTvShow } from '../actions/';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

export function mapStateToProps({ tvShowsDiscover }: StoreState) {
    return {
        isFetching: tvShowsDiscover.isFetching,
        tvShowResults: tvShowsDiscover.tvShowResults,
        hasMore: tvShowsDiscover.hasMore,
    };
}

export function mapDispatchToProps(dispatch: Dispatch<any>) {
    return bindActionCreators({
        fetchDiscoverTvShows,
        navigateToShow: (showId: number) => selectTvShow(showId)
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TvShowsOverview);
