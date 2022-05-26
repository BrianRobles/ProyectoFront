import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) return <div>Accediendo</div>

  if (isAuthenticated) return <>{children}</>;

  if (!isAuthenticated) {
    loginWithRedirect();
  }
  
  return <div>Loading...</div>

};

export default PrivateRoute;
