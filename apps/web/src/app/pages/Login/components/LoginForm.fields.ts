import { FormFieldWithoutSetValue } from '@kwjs/ui-components';

const LoginFormFields: FormFieldWithoutSetValue[] = [
    {
        name: 'email',
        label: 'Email',
        required: true,
        type: 'email',
        placeholder: 'Enter Email',
        default: null
    },
    {
        name: 'password',
        label: 'Password',
        required: true,
        type: 'password',
        placeholder: 'Enter Password',
        default: null
    }
];

export default LoginFormFields;
