import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/usuarios/mutations';
import { toast } from 'react-toastify';

const Login = () => {
  const [createUser, { loading: mutationLoading, error, data }] =
    useMutation(CREATE_USER);
  const navigate = useNavigate();
  const { isLoading, user } = useAuth0();
  const [creatingUser, setCreatingUser] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (user.given_name === 'false') {
        navigate('/');
      } else if (creatingUser === false) {
        setCreatingUser(true);
      }

      if (creatingUser === true) {
        createUser({
          variables: {
            nombre: user.name,
            apellido: user.family_name,
            correo: user.email,
            rol: user.nickname,
          },
        });
      }
    }
  }, [isLoading, navigate, user, creatingUser, setCreatingUser, createUser]);

  useEffect(() => {
    if (data) {
      navigate('/');
    }
  }, [data, navigate]);

  if (error) {
    toast.error('Ha ocurrido un error al registrarse');
  }

  if (isLoading || mutationLoading) return <Loading />;
};

export default Login;
