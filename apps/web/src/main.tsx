import {
    BrowserProvider,
    GraphqlClientProvider,
    WebThemeProvider
} from '@king/ui-components';
import React from 'react';
import ReactDOM from 'react-dom';
import IndexRouter from './app/router/IndexRouter';

ReactDOM.render(
    <BrowserProvider>
        <GraphqlClientProvider>
            <WebThemeProvider>
                <IndexRouter />
            </WebThemeProvider>
        </GraphqlClientProvider>
    </BrowserProvider>,
    document.getElementById('root')
);
