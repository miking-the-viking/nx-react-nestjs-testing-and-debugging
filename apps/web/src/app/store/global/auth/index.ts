import { Reducer } from 'redux';
import { User } from '../../../gql/generated/types';

export interface AuthState {
    user: User | null;
    jwt: string | null;
}

export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const SET_JWT = 'SET_JWT';
export const CLEAR_JWT = 'CLEAR_JWT';

interface SetUserType {
    type: typeof SET_USER;
    user: User;
}

export const SetUser = (user: SetUserType['user']): SetUserType => ({
    type: SET_USER,
    user
});

interface ClearUserType {
    type: typeof CLEAR_USER;
}

export const ClearUser = (): ClearUserType => ({
    type: CLEAR_USER
});

interface SetJwtType {
    type: typeof SET_JWT;
    jwt: string | null;
}

export const SetJwt = (jwt: SetJwtType['jwt'] = null): SetJwtType => ({
    type: SET_JWT,
    jwt
});

interface ClearJwtType {
    type: typeof CLEAR_JWT;
}

export const ClearJwt = (): ClearJwtType => ({
    type: CLEAR_JWT
});

export type AuthActions =
    | SetUserType
    | ClearUserType
    | SetJwtType
    | ClearJwtType;

const loadJwtFromLocalStorage = () => {
    try {
        return localStorage.getItem('token');
    } catch (e) {
        console.log('No stored jwt');
    }
    return null;
};

const clearJwt = () => {
    localStorage.removeItem('token');
};
const storeOrRemoveJwt = (jwt: string | null) => {
    if (jwt) {
        localStorage.setItem('token', jwt);
    } else {
        clearJwt();
    }
};

const JWT = loadJwtFromLocalStorage();

export const initialDefaultAuthState: AuthState = {
    user: null,
    jwt: JWT
};

const AuthReducer: Reducer<AuthState, AuthActions> = (
    state: AuthState = initialDefaultAuthState,
    action
) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user
            };
        case CLEAR_USER: {
            return {
                ...state,
                user: null
            };
        }
        case SET_JWT: {
            const { jwt } = action;
            storeOrRemoveJwt(jwt);
            return {
                ...state,
                jwt: jwt
            };
        }
        case CLEAR_JWT: {
            clearJwt();
            return { ...state, jwt: null };
        }
        default:
            return state;
    }
};

export default AuthReducer;
