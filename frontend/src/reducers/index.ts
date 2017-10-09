import { combineReducers } from 'redux';
import tvShowsDiscover from './tvShowsDiscover';
import tvShows from './tvShows';
import seasonDetail from './seasonDetail';
import favourites from './favourites';
import { StoreState } from '../types/index';
import apiStatus from './apiStatusReducer';
import { routerReducer } from 'react-router-redux';

const tvBrowserReducer = combineReducers<StoreState>({
    router: routerReducer,
    tvShowsDiscover,
    tvShows,
    seasonDetail,
    favourites,
    apiStatus
});

export default tvBrowserReducer;
