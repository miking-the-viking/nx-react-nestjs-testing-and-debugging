import { IRouteRule } from '../types';

export const RequiresAuth: IRouteRule = ({ Auth }) => {
    return !!Auth.jwt && !!Auth.user;
};

export default RequiresAuth;
