import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ROUTES from '../../router/routes';
import SignupForm from './components/SignupForm/SignupForm';
import { Box, Icon } from '@chakra-ui/core';

const title = ROUTES.SIGNUP.name;

const Signup: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content="Signup" />
            </Helmet>
            <SignupForm />
            <Box as="p" textAlign="center">
                Already have an account?{' '}
                <Link to={ROUTES.LOGIN.path}>
                    Login! <Icon name="external-link" mx="2px" />
                </Link>
            </Box>
        </>
    );
};

export default Signup;
