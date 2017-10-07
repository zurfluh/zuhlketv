import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';

import './Filters.css';

class Sorting {
  key: string;
  text: string;
}

class Language {
  code: string;
  englishName: string;
}

class Filters extends React.Component {
  private sortings: Sorting[] = [
    { key: 'popularity.desc', text: 'Popularity' },
    { key: 'vote_average.desc', text: 'Votings' },
    { key: 'first_air_date.desc', text: 'First Airing' }
  ];

  private languages: Language[] = [
    { code: 'en', englishName: 'English' },
    { code: 'zh', englishName: 'Chinese' },
    { code: 'de', englishName: 'German' }
  ];

  getSortingItems() {
    return this.sortings.map(s => (
      <Dropdown.Item key={s.key} text={s.text} />
    ));
  }

  getLanguageItems() {
    return this.languages.map(l => (
      <Dropdown.Item key={l.code} text={l.englishName} />
    ));
  }

  render() {
    return (
      <div className='All-filters'>
        <Dropdown className='Filter' text='Sort By: Popularity'>
          <Dropdown.Menu>
            {this.getSortingItems()}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className='Filter' text='Original Language: English'>
          <Dropdown.Menu>
            {this.getLanguageItems()}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default Filters;
