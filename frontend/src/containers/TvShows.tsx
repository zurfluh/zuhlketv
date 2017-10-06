import { TvShowsOverview } from '../components/TvShows';
import {fetchDiscoverTvShows, DiscoverTvShowsAction} from '../actions/';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import {bindActionCreators} from 'redux';


export function mapStateToProps({ tvShowsDiscover }: StoreState) {
    return {
        isFetching: tvShowsDiscover.isFetching,
        tvShows: tvShowsDiscover.tvShows
    }
}

export function mapDispatchToProps(dispatch: Dispatch<DiscoverTvShowsAction>) {
    return bindActionCreators({fetchDiscoverTvShows}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TvShowsOverview);
