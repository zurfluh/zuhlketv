import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { DiscoverTvSortKey, OriginalLanguageCode, StoreState, DiscoverTvShowsFilter } from '../types';

import './Filters.css';
import { bindActionCreators } from 'redux';
import { Dispatch, connect } from 'react-redux';
import { DiscoverTvShowsAction, updateDiscoverFilter } from '../actions';

class Sorting {
  key: DiscoverTvSortKey;
  text: string;
}

class Language {
  code: OriginalLanguageCode;
  englishName: string;
}

interface FiltersProps {
  filter: DiscoverTvShowsFilter;
  updateDiscoverFilter: (filter: Partial<DiscoverTvShowsFilter>) => any;
}

class Filters extends React.Component<FiltersProps> {
  private sortings: Sorting[] = [
    { key: 'popularity.desc', text: 'Popularity' },
    { key: 'vote_average.desc', text: 'Votes' },
    { key: 'first_air_date.desc', text: 'Next Releases' }
  ];

  private languages: Language[] = [
    { code: 'en', englishName: 'English' },
    { code: 'zh', englishName: 'Chinese' },
    { code: 'de', englishName: 'German' }
  ];

  getSortingItems() {
    return this.sortings.map(s => (
      <Dropdown.Item
        key={s.key}
        text={s.text}
        active={s.key === this.props.filter.sort}
        onClick={() => this.props.updateDiscoverFilter({ sort: s.key })}
      />
    ));
  }

  getLanguageItems() {
    return this.languages.map(l => (
      <Dropdown.Item
        key={l.code}
        text={l.englishName}
        active={l.code === this.props.filter.original_language}
        onClick={() => this.props.updateDiscoverFilter({ original_language: l.code })}
      />
    ));
  }

  render() {
    const selectedSort = this.sortings.find(s => s.key === this.props.filter.sort);    
    const selectedLanguage = this.languages.find(l => l.code === this.props.filter.original_language);

    return (
      <div className='All-filters'>
        <Dropdown
          className='Filter'
          text={`Sort By: ${selectedSort && selectedSort.text}`}
          value={this.props.filter.sort}
        >
          <Dropdown.Menu>
            {this.getSortingItems()}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown
          className='Filter'
          text={`Original Language: ${selectedLanguage && selectedLanguage.englishName}`}
          value={this.props.filter.original_language}
        >
          <Dropdown.Menu>
            {this.getLanguageItems()}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export function mapStateToProps(
  { tvShowsDiscover }: StoreState
) {
  return {
    filter: tvShowsDiscover.filter
  };
}

export function mapDispatchToProps(dispatch: Dispatch<DiscoverTvShowsAction>) {
  return bindActionCreators({
    updateDiscoverFilter
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
