import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import createHistory from 'history/createBrowserHistory'
import tvBrowserReducer from './reducers';
import { StoreState } from './types/index';
import registerServiceWorker from './registerServiceWorker';
import MainView from './MainView';

import './index.css';
import 'semantic-ui-css/semantic.min.css';


const history = createHistory()

const store = createStore<StoreState>(
  tvBrowserReducer,
  applyMiddleware(
    thunkMiddleware, // lets us return dispatch() functions
    logger,
    routerMiddleware(history)
  )
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MainView/>
        </ConnectedRouter>
      </Provider>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
