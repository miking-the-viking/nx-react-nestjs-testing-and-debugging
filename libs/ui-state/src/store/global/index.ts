import { combineReducers, compose, createStore } from 'redux';
import AuthReducer, { AuthActions, AuthState, SetJwt } from './auth';

import SystemReducer, { SystemState, SystemActions } from './system';

export * from './GlobalStoreWrapper';
export * from './auth';
export * from './system';

export type AppState = {
    Auth: AuthState;
    System: SystemState;
};

export type AppActions = AuthActions & SystemActions;

const rootReducer = combineReducers<AppState, AppActions>({
    Auth: AuthReducer,
    System: SystemReducer
});

const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    {},
    // process.env.NODE_ENV === 'development' ? composeEnhancers() : {}
    composeEnhancers()
);

export default store;
