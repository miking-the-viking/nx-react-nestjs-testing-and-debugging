import React, { useEffect, Suspense } from 'react';
import { useSelector } from 'react-redux';
import {
    Redirect,
    Route,
    Switch,
    useHistory,
    useLocation
} from 'react-router-dom';
import { AppLayout } from '@kwjs/ui-components';
import { AppState } from '@kwjs/ui-state';
import PATH from '../routes';
import LOGGED_IN_ROUTES from './LoggedInRoutes';

const LoggedInRouter: React.FC = () => {
    const { push } = useHistory();

    const { user, hasUser, apiKeys, loading } = useSelector(
        (state: AppState) => ({
            hasUser: !!state.Auth.user,
            user: state.Auth.user,
            loading: state.System.loading
        })
    );

    useLocation();

    if (!hasUser) {
        return <p>Loading user data</p>;
    }

    return (
        <AppLayout>
            <Route
                path="/"
                render={() => (
                    <Switch>
                        {LOGGED_IN_ROUTES.map(route => {
                            return (
                                <Route
                                    exact
                                    path={route.path}
                                    render={() => <route.render />}
                                    key={route.path}
                                />
                            );
                        })}
                        <Redirect to={PATH.DASHBOARD.path} />
                    </Switch>
                )}
            />
        </AppLayout>
    );
};

export default LoggedInRouter;
