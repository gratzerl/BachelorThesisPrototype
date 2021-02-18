import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import  ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloLink, split, from } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

import { cache, stateLink } from './resolvers/stateResolvers';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import App from './components/App';

import './index.css';

//websocket link for subscriptions
const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/subscriptions',
    options: {
        reconnect: true
    }
});

//for queries
const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql'
});

//add authentication header to the requests
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('clientId');
    return {
        headers: {
            ...headers,
            authorization: `${token}`,
        }
    };
});

//split requests between subscriptions (websocket) and regular requests (httpLink)
const splitLink = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    from([
        authLink,
        httpLink
    ])
);



//create link
const link = ApolloLink.from([splitLink]);

//create client
const client = new ApolloClient({
    link:  from([stateLink, link]),
    cache: cache,
});

//render Application
ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </BrowserRouter>, 
    document.getElementById('root')
);
