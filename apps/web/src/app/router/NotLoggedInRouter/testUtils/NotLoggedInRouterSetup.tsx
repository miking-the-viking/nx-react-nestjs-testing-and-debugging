import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router';
import React, { Suspense } from 'react';
import NotLoggedInRouter from '../NotLoggedInRouter';

const NotLoggedInRouterSetup = (path: string) => {
    const history = createMemoryHistory();
    history.push(path);

    const { getByTestId } = render(
        <Router history={history}>
            <Suspense fallback={null}>
                <NotLoggedInRouter />
            </Suspense>
        </Router>,
    );

    return { getByTestId };
};

export default NotLoggedInRouterSetup;
