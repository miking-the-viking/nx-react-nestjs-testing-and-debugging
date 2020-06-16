import { Module } from '@nestjs/common';
import providers from './providers';
import clientProviderFactory from './providers/clientProviderFactory';
import { GraphqlService } from './graphql.service';

export const gqlClientProviders = providers.map(providerConfig =>
    clientProviderFactory<ReturnType<typeof providerConfig.sdk>>(providerConfig)
);

@Module({
    providers: [GraphqlService, ...gqlClientProviders],
    exports: [GraphqlService, ...gqlClientProviders]
})
export class GraphqlModule {}
