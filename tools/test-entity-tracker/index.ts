import { gqlClientFactory, HasuraGqlClientConfig, HasuraSdk } from '@king/data';
import { InjectablePasswordService } from './InjectablePasswordService.interface';
import { UserEntityTracker } from './user';

export * from './user';

export class TestEntityTracker {
    public user: UserEntityTracker;

    protected readonly gql = gqlClientFactory<HasuraSdk>(
        { endpoint: HasuraGqlClientConfig.endpoint },
        HasuraGqlClientConfig.sdk
    );

    constructor(passwordService: InjectablePasswordService) {
        this.user = new UserEntityTracker(this.gql, passwordService);
    }

    public async purge() {
        await this.user.purge();
    }
}
