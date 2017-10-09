import * as React from 'react';
import { Card, Image, Rating } from 'semantic-ui-react';
import * as moment from 'moment';

import { TvShow } from '../services/TvShowsService';
import './TvShowCard.css';
import { getImageUrl } from '../services/ImageService';

export interface Props {
    show: TvShow;
    isFavorite: boolean;
    onClick: () => void;
}

export function TvShowCard({ show, onClick, isFavorite }: Props): JSX.Element {
    return (
        <Card link onClick={onClick}>
            <Image
                src={getImageUrl(show.poster_path)}
                className='poster'
                label={isFavorite && { as: 'a', color: 'purple', corner: 'left', icon: 'heart' }}
            />
            <Card.Content>
                <Card.Header>{show.name}</Card.Header>
                <Card.Meta>{moment(show.first_air_date, 'YYYY-MM-DD').format('ll')}</Card.Meta>
                <Card.Description>
                    {cropText(show.overview)}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Rating rating={show.vote_average} maxRating={10} disabled />
                <span className='voteCount'>({show.vote_count} votes)</span>
            </Card.Content>
        </Card>
    );
}

const MAX_TEXT_LENGTH = 200;
const ENDING_CHARACTER = ' ';
const CROPPED_END = '...';

function cropText(text: string, maxLength: number = MAX_TEXT_LENGTH): string {
    if (text.length > MAX_TEXT_LENGTH) {
        const subPart = text.substring(0, maxLength + 1);
        const lastWordEnd = subPart.lastIndexOf(ENDING_CHARACTER);
        return subPart.substring(0, lastWordEnd) + CROPPED_END;
    } else {
        return text;
    }
}
