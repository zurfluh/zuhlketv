import { combineReducers } from 'redux';
import tvShowsDiscover from './tvShowsDiscover';
import { StoreState } from '../types/index';


const tvBrowserReducer = combineReducers<StoreState>({
    tvShowsDiscover
});

export default tvBrowserReducer;
