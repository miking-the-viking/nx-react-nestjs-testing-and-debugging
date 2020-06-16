import { lazy } from 'react';

export const Signup = lazy(() =>
    import(/* webpackChunkName: "Signup"  */ './Signup/Signup')
);

export const Login = lazy(() =>
    import(/* webpackChunkName: "Login"  */ './Login/Login')
);

export const Dashboard = lazy(() =>
    import(/* webpackChunkName: "Dashboard"  */ './Dashboard/Dashboard')
);
