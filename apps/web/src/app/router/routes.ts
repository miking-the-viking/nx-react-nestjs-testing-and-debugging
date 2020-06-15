import { RequiresAuth, RequiresGuest } from '@kwjs/route-manager';
import { Dashboard, Login, Signup } from '../pages';

const SIGNUP = () => ({
    path: '/signup',
    icon: null,
    render: Signup,
    name: 'Signup',
    page: '/Signup/Signup',
    rules: [RequiresGuest]
});

const LOGIN = () =>
    ({
        path: '/login',
        icon: null,
        render: Login,
        name: 'Login',
        page: '/Login/Login',
        rules: [RequiresGuest]
    } as const);

const DASHBOARD = () =>
    ({
        path: '/dashboard',
        icon: null,
        render: Dashboard,
        name: 'Dashboard',
        page: '/Dashboard/Dashboard',
        rules: [RequiresAuth]
    } as const);

export const ROUTES = {
    SIGNUP: SIGNUP(),
    LOGIN: LOGIN(),
    DASHBOARD: DASHBOARD()
};

export default ROUTES;
