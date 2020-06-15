import { SetMetadata } from '@nestjs/common';

export const GQL_CLIENT = Symbol('GqlClient');

/**
 * Graphql Client Decorator for denoting an Graphql Client
 */
export const RegisterGraphqlClient = (provider: string) =>
    SetMetadata(GQL_CLIENT, provider);
