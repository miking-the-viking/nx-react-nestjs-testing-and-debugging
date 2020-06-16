import {
    HasuraGqlClientConfig,
    HasuraGqlClient
} from './hasura-client.provider';

export * from './hasura-client.provider';

export type GraphqlClientTypes = typeof HasuraGqlClient;

const gqlClientProviders = [HasuraGqlClientConfig];

export default gqlClientProviders;
