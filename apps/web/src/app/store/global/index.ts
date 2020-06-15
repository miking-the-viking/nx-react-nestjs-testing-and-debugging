import { combineReducers, compose, createStore } from 'redux';
import AuthReducer, { AuthActions, AuthState, SetJwt } from './auth';
import GameReducer, { GameActions, GameState } from './games';
import SystemReducer, { SystemState, SystemActions } from './system';

export type AppState = {
  Game: GameState;
  Auth: AuthState;
  System: SystemState;
};

export type AppActions = GameActions & AuthActions & SystemActions;

const rootReducer = combineReducers<AppState, AppActions>({
  Game: GameReducer,
  Auth: AuthReducer,
  System: SystemReducer
});

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  {},
  // process.env.NODE_ENV === 'development' ? composeEnhancers() : {}
  composeEnhancers()
);
