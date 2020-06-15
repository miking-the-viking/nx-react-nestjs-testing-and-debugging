import { Injectable, Inject } from '@nestjs/common';
import { GqlClient } from './GqlClientFactory';
import { HasuraGqlClient, HasuraSdk } from './providers/hasura-client.provider';

// TODO: get rid of this service in lieu of resolving `HasuraGqlClient` where needed

@Injectable()
export class GraphqlService {
    constructor(
        @Inject(HasuraGqlClient) private readonly gql: GqlClient<HasuraSdk>
    ) {}

    get sdk() {
        return this.gql.sdk;
    }
}
