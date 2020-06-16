import { Box, Icon } from '@chakra-ui/core';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import PATH from '../../router/routes';
import LoginForm from './components/LoginForm';

const title = PATH.LOGIN.name;

const Login = () => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Login Page" />
      </Helmet>
      <LoginForm />
      <Box as="p" textAlign="center">
        Don't have an account?{' '}
        <RouterLink to={PATH.SIGNUP.path}>
          Create one! <Icon name="external-link" mx="2px" />
        </RouterLink>
      </Box>
    </>
  );
};

export default Login;
