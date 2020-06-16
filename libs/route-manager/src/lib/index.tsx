import { AppState, RouteManagerActions } from '@kwjs/ui-state';
import React, { createContext, useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { IRouteRule } from './rules/types';
export * from './rules';

export interface RouteCoreType {
    path: string;
    name: string;
}

interface RouteBaseType {
    icon: (props: any) => JSX.Element | null;
    render: any;
    page: string;
    rules?: any;
    path: string;
    name: string;
}
export interface RouteType extends RouteBaseType {
    subRoutes?: (
        repoState: any
    ) => (RouteCoreType & Partial<ComputedRouteType>)[];
}

export interface ComputedRouteType extends RouteBaseType {
    subRoutes?: (RouteCoreType & Partial<ComputedRouteType>)[];
}

export interface RouteManagerState {
    routes: RouteType[];
    computedRoutes: ComputedRouteType[];
}

const initialRouteManagerState = {
    routes: [],
    computedRoutes: []
};

const RouteManagerReducer: React.Reducer<
    RouteManagerState,
    RouteManagerActions
> = (state = initialRouteManagerState, action) => {
    switch (action.type) {
        case 'SET_ROUTES':
            return { ...state, routes: action.routes as RouteType[] };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};

export const RouteManagerReducerFactory = (initialState: RouteManagerState) => (
    state = initialRouteManagerState,
    action: RouteManagerActions
) => RouteManagerReducer(state, action);

export const RouteManagerContext = createContext<{
    state: RouteManagerState;
    dispatch: (action: RouteManagerActions) => void;
}>({ state: initialRouteManagerState, dispatch: () => {} });

export const RouteManagerConsumer = RouteManagerContext.Consumer;

interface RouteManagerProviderProps {
    routes: RouteBaseType[];
}

export const RouteManagerProvider: React.FC<RouteManagerProviderProps> = ({
    routes,
    children
}) => {
    const [state, dispatch] = useReducer(RouteManagerReducer, {
        ...initialRouteManagerState,
        routes
    });
    const [computedRoutes, setComputedRoutes] = useState<ComputedRouteType[]>(
        []
    );

    const { Auth, System } = useSelector((state: AppState) => state);

    useEffect(() => {
        const computedRoutes: ComputedRouteType[] = state.routes
            .filter((route: RouteType) => {
                if (!route.rules) {
                    return true;
                }
                const rules = route.rules as IRouteRule[];

                const filterRoute = rules.reduce((acc, rule) => {
                    return (
                        acc &&
                        rule({
                            Auth,
                            System
                        })
                    );
                }, true);
                return filterRoute;
            })
            .map(route => ({
                ...route,
                subRoutes: route.subRoutes
                    ? route.subRoutes({ Auth, System })
                    : undefined
            }));
        setComputedRoutes(computedRoutes);
    }, [state.routes, Auth, System, setComputedRoutes]);

    const value = {
        state: {
            ...initialRouteManagerState,
            computedRoutes
        },
        dispatch
    };

    return (
        <RouteManagerContext.Provider value={value}>
            {children}
        </RouteManagerContext.Provider>
    );
};
