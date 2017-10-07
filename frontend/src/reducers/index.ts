import { combineReducers } from 'redux';
import tvShowsDiscover from './tvShowsDiscover';
import { StoreState } from '../types/index';
import { routerReducer } from 'react-router-redux';


const tvBrowserReducer = combineReducers<StoreState>({
    router: routerReducer,
    tvShowsDiscover
});

export default tvBrowserReducer;
