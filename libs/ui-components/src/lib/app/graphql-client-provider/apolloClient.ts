import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import fetch from 'unfetch';

const httpLink = createHttpLink({
    uri: 'http://localhost:3333/graphql',
    fetch
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
    uri: `ws://localhost:3333/graphql`,
    options: {
        reconnect: true
    }
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    };
});

// TODO: client.resetStore() when logging out

const link = split(
    // split based on operation type
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    authLink.concat(httpLink)
);

export const ApolloClientFactory = () =>
    new ApolloClient({
        cache: new InMemoryCache(),
        link,
        connectToDevTools: true
    });

export const apolloClient = ApolloClientFactory();

export default apolloClient;
