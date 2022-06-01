import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './Loading';

const PrivateRoute = ({ children }) => {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
    user
  } = useAuth0();

  useEffect(() => {
    const getAccesToken = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: 'https://gestion-proyectos/graphql',
      });
      localStorage.setItem('token', accessToken);
    };
    if (isAuthenticated) {
      getAccesToken();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) return <Loading />;

  if (isAuthenticated) return <>{children}</>;

  if (!isAuthenticated) {
    loginWithRedirect();
  }
};

export default PrivateRoute;
