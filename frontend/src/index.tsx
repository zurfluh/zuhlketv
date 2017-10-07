import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import tvBrowserReducer from './reducers';
import { StoreState } from './types/index';
import registerServiceWorker from './registerServiceWorker';
import MainView from './MainView';
import ConfigManager from './config';

import './index.css';
import 'semantic-ui-css/semantic.min.css';

// Trigger the retrieval the config early.
ConfigManager.getConfig();

const store = createStore<StoreState>(
  tvBrowserReducer,
  applyMiddleware(
    thunkMiddleware, // lets us return dispatch() functions
    logger
  )
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainView/>
      </Provider>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
