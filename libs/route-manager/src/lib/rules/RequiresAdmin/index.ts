import { IRouteRule } from '../types';

const RequiresAdmin: IRouteRule = ({ Auth }) => {
  return !!Auth.user && Auth.user.role === 'ADMIN';
};

export default RequiresAdmin;
