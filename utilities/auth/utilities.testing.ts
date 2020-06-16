import { SignupDocument, SignupMutationVariables } from '@kwjs/api';

export const signupMutationBody = (
    data: Partial<SignupMutationVariables> = {}
) => ({
    query: SignupDocument.loc.source.body,
    variables: {
        email: data.email,
        password: data.password
    }
});
