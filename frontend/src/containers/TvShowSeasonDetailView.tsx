import { RouteComponentProps } from 'react-router';
import { selectTvSeason } from '../actions/';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TvSeasonDetail, TvSeasonDetailUrlParams, TvSeasonDetailOwnProps } from '../components/TvSeasonDetail';

export function mapStateToProps(
    { seasonDetail }: StoreState,
    ownProps: TvSeasonDetailOwnProps & RouteComponentProps<TvSeasonDetailUrlParams>
) {
    return {
        isFetching: seasonDetail.isFetching,
        season: seasonDetail.season,
        ...ownProps
    };
}

export function mapDispatchToProps(dispatch: Dispatch<StoreState>) {
    return bindActionCreators({
        selectTvSeason
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TvSeasonDetail);
