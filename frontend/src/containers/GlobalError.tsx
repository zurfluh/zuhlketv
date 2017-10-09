import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Message, Container, Icon } from 'semantic-ui-react';
import { clearApiError, ApiErrorAction } from '../actions/';
import { StoreState, ApiStatusState } from '../types/index';

interface GlobalError {
    apiStatus: ApiStatusState;
    clearApiError: () => void;
}

function GlobalError(props: GlobalError): JSX.Element | null {
    if (!props.apiStatus.error) {
        return null;
    }
    const error = props.apiStatus.error;

    return (
        <Container>
            <Message error icon onDismiss={() => props.clearApiError()}>
                <Icon name='exclamation triangle' />
                <Message.Content>
                    <Message.Header>An Error Occured: {error.name}</Message.Header>
                    {error.message}
                </Message.Content>
            </Message>
        </Container>
    );
}

export function mapStateToProps({ apiStatus }: StoreState) {
    return {
        apiStatus
    };
}

export function mapDispatchToProps(dispatch: Dispatch<ApiErrorAction>) {
    return bindActionCreators({ clearApiError }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalError);
