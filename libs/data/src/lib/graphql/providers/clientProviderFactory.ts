import { GqlClient } from '../GqlClientFactory';
import { Provider, Scope } from '@nestjs/common';
import { ClientProviderConfig } from './ClientProviderConfig.type';

const clientProviderFactory = <SdkType>({
    provide,
    sdk,
    endpoint
}: ClientProviderConfig): Provider<GqlClient<SdkType>> => ({
    provide,
    useFactory: () => {
        return new GqlClient<SdkType>({ endpoint }, sdk);
    },
    scope: Scope.DEFAULT
});

export default clientProviderFactory;
