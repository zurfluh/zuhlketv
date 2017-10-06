import * as React from 'react';
import {Container} from 'semantic-ui-react';
import TvShows from './containers/TvShows';
import './MainView.css';

const zuehlkeLogo = require('./resources/zuehlke_logo.png');

class MainView extends React.Component {
  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={zuehlkeLogo} className='App-logo' alt='logo'/>
          <h1>Zühlke TV Shows</h1>
        </div>
        <Container>
          <TvShows />
        </Container>
      </div>
    );
  }
}

export default MainView;
