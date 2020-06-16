import * as faker from 'faker';

import { CreateUserMutationVariables, CreateUserDocument } from '@kwjs/hasura';

export const createUserMutationVariableFactory = (
    userData: Partial<CreateUserMutationVariables> = {}
) => ({
    email: userData.email || faker.internet.email(),
    password: userData.password || faker.random.word(),
    role: userData.role || 'ADMIN'
});
