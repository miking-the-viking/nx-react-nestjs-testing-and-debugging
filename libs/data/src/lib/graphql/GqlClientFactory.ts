import { GraphQLClient } from 'graphql-request';
import 'node-fetch';

interface GqlClientArgs {
    endpoint: string;
}

type GetSdkType<S> = (client: GraphQLClient, withWrapper?: any) => S;

export class GqlClient<SdkType> {
    private client: GraphQLClient;
    private endpoint: string;

    constructor(
        { endpoint }: GqlClientArgs,
        private readonly getSdk: GetSdkType<SdkType>
    ) {
        this.endpoint = endpoint;
        this.client = new GraphQLClient(endpoint);
    }

    public setToken(token: string) {
        const client = new GraphQLClient(this.endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return this.configureSdk(client);
    }

    public clearToken() {
        this.client.setHeader('Authorization', undefined);
    }

    get sdk() {
        return this.configureSdk();
    }
    private configureSdk(client = this.client) {
        return this.getSdk(client);
    }
}

interface GqlClientFactoryArgs {
    endpoint: string;
}

export const gqlClientFactory = <SdkType>(
    { endpoint }: GqlClientFactoryArgs,
    sdk
) => {
    return new GqlClient<SdkType>({ endpoint }, sdk);
};

export default gqlClientFactory;
