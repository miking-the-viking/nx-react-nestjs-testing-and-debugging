import PATH from '../routes';

/**
 * Routes available to a logged in user (simple)
 */
const LOGGED_IN_ROUTES = [PATH.DASHBOARD] as const;

export default LOGGED_IN_ROUTES;
