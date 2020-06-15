import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import {
    GraphqlModule,
    GqlClient,
    HasuraGqlClient,
    HasuraSdk
} from '@king/data';
import {
    TestEntityTracker,
    createUserMutationVariableFactory
} from '@king/test-entity-tracker';
import { UserService } from './user.service';
import { PasswordService } from '../auth';

const entityTracker = new TestEntityTracker(new PasswordService());

describe('UserService', () => {
    let service: UserService;
    let gql: GqlClient<HasuraSdk>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [GraphqlModule],
            providers: [UserService]
        }).compile();

        service = module.get<UserService>(UserService);
        gql = module.get<GqlClient<HasuraSdk>>(HasuraGqlClient);
    });

    afterAll(async () => {
        await entityTracker.purge();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createUser', () => {
        it('Throws when the email already exists', async () => {
            const existing = await entityTracker.user.seed();

            await expect(
                service.createUser(
                    createUserMutationVariableFactory({ email: existing.email })
                )
            ).rejects.toThrow(
                `Uniqueness violation. duplicate key value violates unique constraint "users_email_key"`
            );
        });

        it('Creates the user', async () => {
            const userData = createUserMutationVariableFactory();

            const createUserResult = await service.createUser(userData);

            // include in the userPurgeArray
            entityTracker.user.push(createUserResult);

            // validate the user exists
            const userRecord = (
                await gql.sdk.UserByEmail({
                    email: createUserResult.email
                })
            ).users[0];

            expect(userRecord).toMatchObject(createUserResult);
        });
    });

    describe('User Retrieval', () => {
        describe('getUserById', () => {
            it('Returns undefined for a non-existant id', async () => {
                await expect(
                    service.getUserById(faker.random.uuid())
                ).resolves.toBeUndefined();
            });

            it('Returns an existing user when using a valid id', async () => {
                const existing = await entityTracker.user.seed();

                delete existing.password;
                delete existing.created_at;

                await expect(
                    service.getUserById(existing.id)
                ).resolves.toMatchObject({
                    ...existing
                });
            });
        });

        describe('getUserByEmail', () => {
            it('Returns undefined for a non-existant email', async () => {
                await expect(
                    service.getUserByEmail(faker.internet.email())
                ).resolves.toBeUndefined();
            });

            it('Returns an existing user when using a valid email', async () => {
                const existing = await entityTracker.user.seed();

                delete existing.password;
                delete existing.created_at;

                await expect(
                    service.getUserByEmail(existing.email)
                ).resolves.toMatchObject({
                    ...existing
                });
            });
        });
    });
});
