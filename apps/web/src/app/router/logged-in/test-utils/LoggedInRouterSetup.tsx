import { MockedProvider } from '@apollo/react-testing';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React, { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import store, { AppState } from '../../../store/global';
import LoggedInRouter from '../LoggedInRouter';

/**
 * Sets up a LoggedInRouter test
 *
 * @param route
 * @param userState
 */
const LoggedInRouterSetup = (route: { path: string }, appState: AppState) => {
    const history = createMemoryHistory();
    history.push(route.path);

    const { getByTestId, findByTestId } = render(
        <Router history={history}>
            <Provider store={store}>
                <MockedProvider mocks={[]} addTypename={false}>
                    <HelmetProvider>
                        <Suspense fallback={null}>
                            <LoggedInRouter />
                        </Suspense>
                    </HelmetProvider>
                </MockedProvider>
            </Provider>
        </Router>,
    );

    return { getByTestId, findByTestId };
};

export default LoggedInRouterSetup;
