import { FormFieldWithoutSetValue } from '@kwjs/ui-components';

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
    }
];

export default SignupFormFields;
