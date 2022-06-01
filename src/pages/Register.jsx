import React from 'react';
import Loading from '../components/Loading';
import { useAuth0 } from '@auth0/auth0-react';

const Register = () => {
  const { isAuthenticated, isLoading, user, logout } = useAuth0();

  const params = new URLSearchParams(window.location.search);
  const state = params.get('state');

  console.log('state ', state)
  console.log('isAuthenticated ', isAuthenticated);

  console.log('isLoading ', isLoading);

  console.log('user ', user);

  return <div onClick={logout}>Logout</div>;
};

export default Register;
