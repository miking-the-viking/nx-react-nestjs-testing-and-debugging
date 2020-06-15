import { IRouteRule } from '../types';

export const RequiresGuest: IRouteRule = ({ Auth }) => {
    return !Auth.jwt || !Auth.user;
};

export default RequiresGuest;
