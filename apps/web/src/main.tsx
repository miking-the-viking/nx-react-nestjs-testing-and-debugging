import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

import { BrowserRouter } from 'react-router-dom';

import App from './app/App';
import client from './app/gql/apolloClient';

ReactDOM.render(
    <BrowserRouter>
        <HelmetProvider>
            <ApolloProvider client={client}>
                <ThemeProvider>
                    <CSSReset />

                    <App />
                </ThemeProvider>
            </ApolloProvider>
        </HelmetProvider>
    </BrowserRouter>,
    document.getElementById('root')
);
