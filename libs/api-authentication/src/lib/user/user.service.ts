import { GqlClient, HasuraGqlClient, HasuraSdk } from '@king/data';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(
        @Inject(HasuraGqlClient) private readonly gql: GqlClient<HasuraSdk>
    ) {}

    /**
     * Retrieve myself by id
     *
     * NOTE: very much equivalent to `getUserById`, consider renaming
     *
     * @param userId
     */
    public async getMe(userId: string) {
        return (await this.gql.sdk.User({ userId })).users_by_pk;
    }

    /**
     * Retrieve a user by their id
     *
     * @param userId
     */
    public async getUserById(userId: string) {
        return (await this.gql.sdk.UserById({ id: userId })).users[0];
    }

    /**
     * Retrieve a User by their id or throw an error
     *
     * @param userId
     */
    public async getUserByIdOrFail(userId: string) {
        const user = await this.getUserById(userId);

        if (!user) {
            throw new NotFoundException(`User ${userId} not found`);
        }
        return user;
    }

    /**
     * Retrieve a User by their email
     *
     * @param email
     */
    public async getUserByEmail(email: string) {
        return (
            await this.gql.sdk.UserByEmail({
                email
            })
        ).users[0];
    }

    /**
     * Create a User
     *
     * @param createUserData
     *
     */
    public async createUser(createUserData) {
        const createdUser = (await this.gql.sdk.CreateUser(createUserData))
            .insert_users.returning[0];

        return createdUser;
    }
}
