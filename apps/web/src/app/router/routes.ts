const SIGNUP = () => ({
    path: '/signup',
    icon: null,
    render: Signup,
    name: 'Signup',
    page: '/Signup/Signup',
    rule: []
});

const LOGIN = () =>
    ({
        path: '/login',
        icon: null,
        render: Login,
        name: 'Login',
        page: '/Login/Login'
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

const ROUTES = {
    LOGIN: LOGIN(),
    SIGNUP: SIGNUP(),
    DASHBOARD: DASHBOARD()
} as const;

export default ROUTES;
