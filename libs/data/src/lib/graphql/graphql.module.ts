import { Module } from '@nestjs/common';
import providers from './providers';
import clientProviderFactory from './providers/clientProviderFactory';

export const gqlClientProviders = providers.map(providerConfig =>
    clientProviderFactory<ReturnType<typeof providerConfig.sdk>>(providerConfig)
);

@Module({
    providers: [...gqlClientProviders],
    exports: [...gqlClientProviders]
})
export class GraphqlModule {}
