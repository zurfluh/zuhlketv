import { TvShowDetail, TvShowDetailParams } from '../components/TvShowDetail';
import { fetchTvShow, setFavourite, TvShowAction } from '../actions/';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RouteComponentProps } from 'react-router';

export function mapStateToProps(
    { tvShows, favourites }: StoreState,
    ownProps: RouteComponentProps<TvShowDetailParams>
) {
    const showId = ownProps.match.params.tvShowId;
    return {
        isFetching: tvShows.isFetching,
        show: tvShows.shows[showId],
        showId,
        isFavourite: favourites[showId]
    };
}

export function mapDispatchToProps(dispatch: Dispatch<TvShowAction>) {
    return bindActionCreators({ fetchTvShow, setFavourite }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TvShowDetail);
