import * as React from 'react';
import { Loader, List, Rating, Item } from 'semantic-ui-react';
import { TvShowDetail, TvSeasonDetail } from '../services/TvShowsService';
import { getImageUrl } from '../services/ImageService';


export interface EpisodeGuideProps {
    tvShow: TvShowDetail;
    // FIXME: selectedSeason is a string instead of a number (parsed from string url)
    selectedSeason: number;
    season: TvSeasonDetail | null;
    isFetching: boolean;
    selectSeason: (seasonNumber: number) => any;
}

export function EpisodeGuide(props: EpisodeGuideProps): JSX.Element {
    return (
        <div>
            <SeasonChooser {...props} />
            <SeasonText {...props} />
            <SeasonOverview {...props} />
        </div>
    );
}

function SeasonChooser(props: EpisodeGuideProps): JSX.Element {
    return (
        <List horizontal link>
            {props.tvShow.seasons.map(s => (
                <List.Item
                    key={s.id}
                    active={props.selectedSeason == s.season_number}
                    onClick={() => props.selectSeason(s.season_number)}
                    as='a'
                >
                    {s.season_number === 0
                        ? 'Specials'
                        : 'Season ' + s.season_number
                    }
                </List.Item>
            ))}
        </List >
    );
}

function SeasonText(props: EpisodeGuideProps): JSX.Element | null {
    if (!props.season || props.isFetching) {
        return <Loader active />;
    }
    if (!props.isFetching && props.season.season_number != props.selectedSeason) {
        props.selectSeason(props.selectedSeason);
        return <Loader active />;
    }

    return (
        <div>
            {props.season.overview}
        </div>
    );
}

function SeasonOverview(props: EpisodeGuideProps): JSX.Element | null {
    if (!props.season || props.isFetching) {
        return <Loader active />;
    }
    if (!props.isFetching && props.season.season_number != props.selectedSeason) {
        props.selectSeason(props.selectedSeason);
        return <Loader active />;
    }

    return (
        <List ordered divided relaxed>
            {props.season.episodes.map(e => {
                return (
                    <List.Item key={e.id}>
                        <List.Content>
                            <Item.Group relaxed>
                                <Item>
                                    <Item.Image src={getImageUrl(e.still_path)} />
                                    <Item.Content>
                                        <Item.Header>{e.name}</Item.Header>
                                        <Item.Meta>{e.crew.map(c => c.name).join(', ')}</Item.Meta>
                                        <Item.Description>{e.overview}</Item.Description>
                                        {e.air_date && <Item.Extra>Air Date: {e.air_date}</Item.Extra>}
                                        <Item.Extra><Rating rating={e.vote_average} maxRating={10} disabled /></Item.Extra>
                                    </Item.Content>
                                </Item>
                            </Item.Group>
                        </List.Content>
                    </List.Item>
                );
            })}
        </List>
    );
}
