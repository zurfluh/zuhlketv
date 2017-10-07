import * as React from 'react';
import { Container } from 'semantic-ui-react';
import { Route } from 'react-router'
import TvShows from './containers/TvShows';
import AboutView from './containers/AboutView';
import TvShowDetailView from './containers/TvShowDetailView';
import Filters from './components/Filters';

import './MainView.css';

const zuehlkeLogo = require('./resources/zuehlke_logo.png');

class MainView extends React.Component {
  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={zuehlkeLogo} className='App-logo' alt='logo' />
          <h1>Zühlke TV Shows</h1>
          <Filters />
        </div>
        <Container>
          <Route exact path='/' component={TvShows} />
          <Route path='/tv/:id' component={TvShowDetailView} />
          <Route path='/about' component={AboutView} />
        </Container>
      </div>
    );
  }
}

export default MainView;
