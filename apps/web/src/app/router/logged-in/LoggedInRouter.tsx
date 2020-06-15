import React, { useEffect, Suspense } from 'react';
import { useSelector } from 'react-redux';
import {
    Redirect,
    Route,
    Switch,
    useHistory,
    useLocation
} from 'react-router-dom';
import AppLayout from '../../components/layouts/AppLayout/AppLayout';
import { AppState } from '../../store/global';
import PATH from '../routes';
import LOGGED_IN_ROUTES from './LoggedInRoutes';

const LoggedInRouter: React.FC = () => {
    const { push } = useHistory();

    const { user, hasUser, apiKeys, hasUserData, loading } = useSelector(
        (state: AppState) => ({
            hasUser: !!state.Auth.user,
            user: state.Auth.user,
            apiKeys: state.Auth.user?.api_keys || [],
            hasUserData: !!state.Auth.user,
            loading: state.System.loading
        })
    );

    useEffect(() => {
        console.log(user);
        if (apiKeys.length === 0 && !loading && hasUser) {
            console.log('User has no Api Keys redirecting to Add API Key');
            push(PATH.ADD_API_KEY.path);
        }
    }, [apiKeys, push, loading]);

    const location = useLocation();

    if (!hasUserData) {
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
                        <Redirect to={PATH.NOT_FOUND.path} />
                    </Switch>
                )}
            />
        </AppLayout>
    );
};

export default LoggedInRouter;
