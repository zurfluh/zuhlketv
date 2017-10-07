import * as React from 'react';
import { Route } from 'react-router'
import TvShows from './containers/TvShows';
import AboutView from './containers/AboutView';
import TvShowDetailView from './containers/TvShowDetailView';

import './MainView.css';

const zuehlkeLogo = require('./resources/zuehlke_logo.png');

class MainView extends React.Component {
  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={zuehlkeLogo} className='App-logo' alt='logo' />
          <h1>Zühlke TV Shows</h1>
        </div>
        <div>
          <Route exact path='/' component={TvShows} />
          <Route path='/tv/:tvShowId' component={TvShowDetailView} />
          <Route path='/about' component={AboutView} />
        </div>
      </div>
    );
  }
}

export default MainView;
