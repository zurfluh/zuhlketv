import { combineReducers } from 'redux';
import tvShowsDiscover from './tvShowsDiscover';
import tvShows from './tvShows';
import seasonDetail from './seasonDetail';
import { StoreState } from '../types/index';
import { routerReducer } from 'react-router-redux';


const tvBrowserReducer = combineReducers<StoreState>({
    router: routerReducer,
    tvShowsDiscover,
    tvShows,
    seasonDetail
});

export default tvBrowserReducer;
