import * as React from 'react';
import {Card, Image, Rating} from 'semantic-ui-react';
import { TvShow } from '../services/DiscoverTvShowsService';

import './TvShowCard.css';


export interface Props {
    show: TvShow;
}

export function TvShowCard({show}: Props): JSX.Element {
    return (
        <Card>
            <Image src={getImageUrl(show.poster_path)} />
            <Card.Content>
            <Card.Header>{show.name}</Card.Header>
            <Card.Meta>{show.first_air_date}</Card.Meta>
            <Card.Description>
                {cropText(show.overview)}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Rating rating={show.vote_average} maxRating={10} disabled/>
                <span className='voteCount'>({show.vote_count} votes)</span>
            </Card.Content>
        </Card>
    );
}


function getImageUrl(path: string, size: string = 'w500'): string {
    return `https://image.tmdb.org/t/p/${size}/${path}`;
}

const MAX_TEXT_LENGTH = 200;
const ENDING_CHARACTER = ' ';
const CROPPED_END = '...';

function cropText(text: string, maxLength = MAX_TEXT_LENGTH): string {
    if (text.length > MAX_TEXT_LENGTH) {
        const subPart = text.substring(0, maxLength + 1);
        const lastWordEnd = subPart.lastIndexOf(ENDING_CHARACTER);
        return subPart.substring(0, lastWordEnd) + CROPPED_END;
    } else {
        return text;
    }
}
