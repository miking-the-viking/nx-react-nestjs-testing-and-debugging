import { useMeLazyQuery } from '@kwjs/hooks-api';
import { apolloClient, LoadingBar } from '@kwjs/ui-components';
import { AppState, ClearJwt, ClearUser, SetUser } from '@kwjs/ui-state';
import { ApolloError } from 'apollo-client';
import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, useHistory, useLocation } from 'react-router-dom';
import LoggedInRouter from './LoggedIn/LoggedInRouter';
import NotLoggedInRouter from './NotLoggedInRouter/NotLoggedInRouter';

const IndexRouter = () => {
    const { loggedIn, loading, jwt } = useSelector((state: AppState) => ({
        loggedIn: !!state.Auth.jwt && !!state.Auth.user,
        loading: state.System.loading,
        jwt: !!state.Auth.jwt
    }));
    const dispatch = useDispatch();

    const router = useHistory();
    useLocation();

    const [
        loadMe,
        {
            loading: meLoading,
            data: meData,
            called: hasCheckedUserData,
            error: meError
        }
    ] = useMeLazyQuery({
        client: apolloClient,
        onError: (err: ApolloError) => {
            if (
                err.graphQLErrors.find(
                    err =>
                        (err.message as any).statusCode === 403 ||
                        (err.message as any).statusCode === 401
                )
            ) {
                console.log('403 or 401 ', err);
                dispatch(ClearJwt());
                dispatch(ClearUser());
                return;
            }
        }
    });

    useEffect(() => {
        if (!meLoading && jwt && hasCheckedUserData && !meError) {
            if (meData && meData.me) {
                dispatch(SetUser(meData.me as any));
            }
        }
    }, [meLoading, jwt, dispatch, meData, router, hasCheckedUserData, meError]);

    useEffect(() => {
        if (!meLoading && jwt) {
            loadMe();
        }
    }, [jwt, loadMe, meLoading]);

    if (!hasCheckedUserData && jwt) {
        return <LoadingBar show={true} />;
    }

    return (
        <>
            <LoadingBar show={loading || meLoading} />
            <Switch>
                <Suspense fallback={<p>Loading...</p>}>
                    {(!jwt || (!hasCheckedUserData && !meLoading)) && (
                        <NotLoggedInRouter />
                    )}

                    {hasCheckedUserData && !meLoading && !!jwt && (
                        <LoggedInRouter />
                    )}
                </Suspense>
            </Switch>
        </>
    );
};

export default IndexRouter;
