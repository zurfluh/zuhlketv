import * as React from 'react';
import { Route } from 'react-router';
import GlobalError from './containers/GlobalError';
import TvShows from './containers/TvShows';
import TvShowDetailView from './containers/TvShowDetailView';
import Filters from './components/Filters';
import { BackNavigation } from './components/BackNavigation';

import './MainView.css';

const zuehlkeLogo = require('./resources/zuehlke_logo.png');

class MainView extends React.Component {
  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={zuehlkeLogo} className='App-logo' alt='logo' />
          <h1>Zühlke TV Shows</h1>
          <Route
            path='/tv/:tvShowId'
            render={() => <BackNavigation to='/' caption='Back to Overview' />}
          />
          <Route exact path='/' component={Filters} />
        </div>
        <div>
          <GlobalError />
          <Route exact path='/' component={TvShows} />
          <Route path='/tv/:tvShowId' component={TvShowDetailView} />
        </div>
      </div>
    );
  }
}

export default MainView;
