import { useLoginMutation } from '@kwjs/hooks-api';
import { apolloClient, GenericForm } from '@kwjs/ui-components';
import { SetJwt, SetLoading } from '@kwjs/ui-state';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ROUTES from '../../../router/routes';
import LoginFormFields from './LoginForm.fields';
import LoginFormSchema from './LoginForm.schema';

const LoginForm: React.FC = () => {
    const { push } = useHistory();
    const dispatch = useDispatch();
    const [login, { loading: submitting, error }] = useLoginMutation({
        client: apolloClient
    });
    const [formErrors, setFormErrors] = useState([]);

    const onSubmit = useCallback(
        async values => {
            let user = null;
            try {
                dispatch(SetLoading(true));
                user = await login({
                    variables: values
                });
                const token = user.data?.login.token || null;
                dispatch(SetJwt(token));
            } catch (e) {
                setFormErrors(
                    e.graphQLErrors ? e.graphQLErrors.map(e => e.message) : []
                );
            }
            dispatch(SetLoading(false));
            if (user && formErrors.length === 0) {
                push(ROUTES.DASHBOARD.path);
            }
        },
        [login, dispatch, push, formErrors]
    );

    return (
        <GenericForm
            fields={LoginFormFields}
            submit={{
                handler: onSubmit,
                label: 'Login'
            }}
            identifier="login-form"
            validationSchema={LoginFormSchema}
            formErrors={formErrors}
        />
    );
};

export default LoginForm;
