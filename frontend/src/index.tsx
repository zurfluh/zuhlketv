import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import axios from 'axios';

import createHistory from 'history/createBrowserHistory'
import tvBrowserReducer from './reducers';
import { StoreState } from './types/index';
import registerServiceWorker from './registerServiceWorker';
import MainView from './MainView';
import ConfigManager from './config';

import './index.css';
import 'semantic-ui-css/semantic.min.css';

// We prepend the base URL from the config to the provided URL. axios requests must be made with just the relative URL.
axios.interceptors.request.use(interceptorConfig => {
  return ConfigManager.getConfig().then(appConfig => {
    interceptorConfig.url = appConfig.TV_SHOWS_BASE_URL + interceptorConfig.url;
    return interceptorConfig;
  });
});

// Trigger the retrieval of the config early.
ConfigManager.getConfig();

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
