import { GqlClient, HasuraSdk, User } from '@kwjs/data';
import { createUserMutationVariableFactory } from './utilities.testing';
import { AbstractEntityTracker } from '../AbstractEntityTracker.testing';
import { InjectablePasswordService } from '../InjectablePasswordService.interface';

export class UserEntityTracker extends AbstractEntityTracker<User> {
    private usersToPurge: Partial<User>[];

    constructor(
        private readonly gql: GqlClient<HasuraSdk>,
        private readonly passwordService: InjectablePasswordService
    ) {
        super();
        this.usersToPurge = [];
    }

    public async getById(userId: string) {
        return await this.gql.sdk.User({
            userId
        });
    }

    public async seed(
        userData: Partial<
            ReturnType<typeof createUserMutationVariableFactory>
        > = createUserMutationVariableFactory()
    ) {
        userData = {
            ...createUserMutationVariableFactory(),
            ...userData
        };
        const hashedPassword = await this.passwordService.hashPassword(
            userData.password
        );
        const userDataToStore = {
            ...userData,
            password: hashedPassword
        };
        const user = (await this.gql.sdk.CreateUser(userDataToStore as any))
            .insert_users.returning[0];
        this.usersToPurge.push(user);
        return { ...user, password: userData.password };
    }
    public async clear(variables: Partial<User>) {
        return await this.gql.sdk.DeleteUserById({ id: variables.id });
    }
    public async purge() {
        while (this.usersToPurge.length > 0) {
            await this.clear(this.usersToPurge.pop());
        }
    }
    public push(userToPush: { id: string }): void {
        this.usersToPurge.push(userToPush);
    }
}
