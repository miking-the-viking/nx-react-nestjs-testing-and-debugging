import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import PATH from '../../router/routes';
import SignupForm from './components/SignupForm/SignupForm';
import { Box, Icon } from '@chakra-ui/core';

const title = PATH.SIGNUP.name;

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
                <Link to={PATH.LOGIN.path}>
                    Login! <Icon name="external-link" mx="2px" />
                </Link>
            </Box>
        </>
    );
};

export default Signup;
