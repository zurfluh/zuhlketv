import { TvShowsOverview } from '../components/TvShows';
import { fetchDiscoverTvShows, selectTvShow } from '../actions/';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

export function mapStateToProps({ tvShowsDiscover, favourites }: StoreState) {
    return {
        isFetching: tvShowsDiscover.isFetching,
        tvShowResults: tvShowsDiscover.tvShowResults,
        hasMore: tvShowsDiscover.hasMore,
        filter: tvShowsDiscover.filter,
        favourites
    };
}

export function mapDispatchToProps(dispatch: Dispatch<StoreState>) {
    return bindActionCreators({
        fetchDiscoverTvShows,
        navigateToShow: selectTvShow
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TvShowsOverview);
