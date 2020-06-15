import { FormFieldWithoutSetValue } from '@king/ui-components';

const SignupFormFields: FormFieldWithoutSetValue[] = [
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter Email',
        default: null
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter Password',
        default: null
    },
    {
        name: 'name',
        label: 'Username',
        type: 'text',
        placeholder: 'Enter a unique Username',
        default: null
    }
];

export default SignupFormFields;
