import * as faker from 'faker';

import { CreateUserMutationVariables } from '@king/hasura';

export const createUserMutationVariableFactory = (
    userData: Partial<CreateUserMutationVariables> = {}
) => ({
    email: userData.email || faker.internet.email(),
    password: userData.password || faker.random.word(),
    role: userData.role || 'ADMIN'
});

export const signupMutationFactory = ({
    email,
    password
}: {
    email?: string;
    password?: string;
}) => `mutation {
          signup(
            data: {
              ${email ? `email: "${email}"` : ''}
              ${password ? `password: "${password}"` : ''}
            }
          ) 
          { token }
        }`;
