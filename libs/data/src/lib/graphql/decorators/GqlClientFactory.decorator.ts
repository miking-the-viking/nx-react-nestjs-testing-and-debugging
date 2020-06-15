import { SetMetadata } from '@nestjs/common';

export const GQL_CLIENT_FACTORY = Symbol('GqlClientFactory');

/**
 * GQL Client Factory Decorator for denoting an GQL Client Factory
 */
export const RegisterGqlClientFactory = () =>
    SetMetadata(GQL_CLIENT_FACTORY, {});
