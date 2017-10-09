import * as React from 'react';
import { Icon, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './BackNavigation.css';

export interface BackNavigationProps {
    to: string;
    caption?: string;
}

export function BackNavigation(props: BackNavigationProps): JSX.Element {
    return (
        <Link to={props.to} className='BackNav-link'>
            <Header size='medium'>
                <Icon name='left chevron' />
                {props.caption || 'Back'}
            </Header>
        </Link>
    );
}
