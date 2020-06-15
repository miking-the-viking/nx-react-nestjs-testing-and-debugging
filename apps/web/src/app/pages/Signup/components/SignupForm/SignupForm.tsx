import { apolloClient, GenericForm } from '@kwjs/ui-components';
import { ClearUser, SetJwt, SetLoading, SetUser } from '@kwjs/ui-state';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PATH from '../../../../router/routes';
import SignupFormFields from './SignupForm.fields';
import SignupFormSchema from './SignupForm.schema';
import { useSignupMutation, SignupMutationVariables } from '@kwjs/hooks-api';

const SignupForm: React.FC = () => {
    const { push } = useHistory();
    const [signup] = useSignupMutation({ client: apolloClient });
    const dispatch = useDispatch();
    const [formErrors, setFormErrors] = useState([]);

    const onSubmit = useCallback(async (values: SignupMutationVariables) => {
        let user = null;
        try {
            dispatch(SetLoading(true));
            user = await signup({
                variables: values
            });

            const token = user.data?.signup.token || null;
            const userData = user.data?.signup.user || null;
            const userAction = userData
                ? SetUser(userData as any)
                : ClearUser();
            dispatch(userAction);
            dispatch(SetJwt(token));
        } catch (e) {
            console.error(e);
            setFormErrors(
                e.graphQLErrors ? e.graphQLErrors.map(e => e.message) : []
            );
        }
        dispatch(SetLoading(false));
        if (user && formErrors.length === 0) {
            push(PATH.DASHBOARD.path);
        }
    }, []);

    return (
        <>
            <GenericForm
                fields={SignupFormFields}
                submit={{
                    handler: onSubmit,
                    label: 'Signup'
                }}
                identifier="signup-form"
                validationSchema={SignupFormSchema}
                formErrors={formErrors}
            />
        </>
    );
};

export default SignupForm;
