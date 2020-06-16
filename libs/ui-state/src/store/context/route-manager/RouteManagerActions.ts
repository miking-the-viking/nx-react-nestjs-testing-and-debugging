/**
 * Set Routes state
 */
export const setRoutes = (routes: any[]) =>
    ({ type: 'SET_ROUTES', routes } as const);

export type RouteManagerActions = ReturnType<typeof setRoutes>;
