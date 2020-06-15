import {
    GqlClient,
    GraphqlModule,
    HasuraGqlClient,
    HasuraSdk
} from '@king/data';
import {
    createUserMutationVariableFactory,
    TestEntityTracker
} from '@king/test-entity-tracker';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { decode, sign } from 'jsonwebtoken';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { authConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { PasswordService } from './password.service';

const entityTracker = new TestEntityTracker(new PasswordService());

describe('Auth Service', () => {
    let service: AuthService;
    let passwordService: PasswordService;
    let gql: GqlClient<HasuraSdk>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, PasswordService, JwtStrategy],
            imports: [
                GraphqlModule,
                JwtModule.register({
                    secret: authConstants.jwtSecret
                }),
                UserModule
            ]
        }).compile();

        service = module.get<AuthService>(AuthService);
        gql = module.get<GqlClient<HasuraSdk>>(HasuraGqlClient);
        passwordService = module.get<PasswordService>(PasswordService);
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
            ).rejects.toThrow(`User already exists ${existing.email}`);
        });

        it('Creates the user, returning a jwt and hashes the password successfully', async () => {
            const userData = createUserMutationVariableFactory();

            const userDataSuccess = await service.createUser(userData);

            // jwt should be signed with userId
            expect(decode(userDataSuccess)).toHaveProperty('userId');

            // validate the user exists
            const userRecord = (
                await gql.sdk.UserByEmail({
                    email: userData.email
                })
            ).users[0];

            // include in the userPurgeArray
            entityTracker.user.push(userRecord);

            // validate the password
            expect(
                passwordService.validatePassword(
                    userData.password,
                    userRecord.password
                )
            ).resolves.toBeTruthy();
        });
    });

    describe('login', () => {
        it('Throws a "Invalid Login" if the user does not exist', async () => {
            const userData = createUserMutationVariableFactory();
            expect(
                service.login(userData.email, userData.password)
            ).rejects.toThrow('Invalid Login');
        });

        it('Throws a "Invalid Login" if the password is invalid', async () => {
            const userData = createUserMutationVariableFactory();
            await entityTracker.user.seed(userData);

            expect(
                service.login(userData.email, userData.password + 'xxxx')
            ).rejects.toThrow('Invalid Login');
        });

        it('Returns a valid jwt containing `userId` and `apiKeys` on successful login', async () => {
            const userData = createUserMutationVariableFactory();
            await service.createUser(userData);

            const user = (
                await gql.sdk.UserByEmail({
                    email: userData.email
                })
            ).users[0];
            entityTracker.user.push(user);

            const loginSuccess = await service.login(
                userData.email,
                userData.password
            );

            const jwtObject = decode(loginSuccess);
            // validate the existence and value of these keys
            expect(jwtObject['userId']).toEqual(user.id);
        });
    });

    describe('getUserFromToken', () => {
        it('returns undefined if the id does not exist', async () => {
            const jwt = sign(
                { userId: 'fa564b3d-7735-41e0-801d-4b00605f60ff' },
                authConstants.jwtSecret
            );

            expect(service.getUserFromToken(jwt)).resolves.toBeUndefined();
        });

        it('Returns the valid user entity when the user exists', async () => {
            const userData = createUserMutationVariableFactory();
            const jwt = await service.createUser(userData);

            const user = (
                await gql.sdk.UserByEmail({
                    email: userData.email
                })
            ).users[0];
            entityTracker.user.push(user);

            await expect(service.getUserFromToken(jwt)).resolves.toEqual(user);
        });
    });
});
