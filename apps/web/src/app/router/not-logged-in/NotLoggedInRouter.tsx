import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ROUTE from '../routes';

const NOT_LOGGED_IN_ROUTES = [ROUTE.LOGIN, ROUTE.SIGNUP];

const NotLoggedInRouter: React.FC = () => (
    <Route
        path="/"
        render={() => (
            <Switch>
                {NOT_LOGGED_IN_ROUTES.map(route => (
                    <Route
                        key={route.path}
                        exact
                        path={route.path}
                        render={() => <route.render />}
                    />
                ))}
                <Redirect to={ROUTE.LOGIN.path} />
            </Switch>
        )}
    />
);

export default NotLoggedInRouter;
