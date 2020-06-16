import { BrowserProvider, WebThemeProvider } from '@kwjs/ui-components';
import { GlobalStoreProvider } from '@kwjs/ui-state';
import React from 'react';
import IndexRouter from './router';
import { RouteManagerProvider } from '@kwjs/route-manager';
import { ROUTES } from './router/routes';

const routes = Object.keys(ROUTES).map(k => ROUTES[k]);

export const App = () => {
    return (
        <BrowserProvider>
            <GlobalStoreProvider>
                <WebThemeProvider>
                    <RouteManagerProvider routes={routes}>
                        <IndexRouter />
                    </RouteManagerProvider>
                </WebThemeProvider>
            </GlobalStoreProvider>
        </BrowserProvider>
    );
};

export default App;
