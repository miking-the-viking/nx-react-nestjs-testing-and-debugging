import { getSdk as sdk } from '@king/hasura';

export const HasuraGqlClient = Symbol('HasuraGraphqlClient');
const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT;
export const HasuraGqlClientConfig = {
    sdk,
    provide: HasuraGqlClient,
    endpoint: HASURA_ENDPOINT
};
export type HasuraSdk = ReturnType<typeof sdk>;
