import React, { Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, useHistory, useLocation } from 'react-router-dom';
import NotLoggedInRouter from './not-logged-in/NotLoggedInRouter';
import LoggedInRouter from './logged-in/LoggedInRouter';

const IndexRouter: React.FC = () => {
    const dispatch = useDispatch();

    const router = useHistory();
    useLocation();

    return (
        <>
            {/* <LoadingBar show={loading || meLoading} /> */}
            <Switch>
                <Suspense fallback={<p>Loading...</p>}>
                    <NotLoggedInRouter />
                    {/* {(!jwt || (!hasCheckedUserData && !meLoading)) && (
                        <NotLoggedInRouter />
                    )}

                    {hasCheckedUserData && !meLoading && !!jwt && (
                        <LoggedInRouter />
                    )} */}
                </Suspense>
            </Switch>
        </>
    );
};

export default IndexRouter;
