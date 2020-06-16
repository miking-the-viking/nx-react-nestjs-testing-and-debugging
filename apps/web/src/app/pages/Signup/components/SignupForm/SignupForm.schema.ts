import { object, string } from 'yup';
import { SignupMutationVariables } from '@kwjs/hooks-api';

const SignupFormSchema = object<SignupMutationVariables>().shape({
    email: string().required('Email is required').email('Email is invalid'),
    password: string()
        .required('Password is required')
        .min(4, 'A min length of 4 characters is required for a password')
});

export default SignupFormSchema;
