import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../../graphql/usuarios/queries';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';

const UsersIndex = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  useEffect(() => {
    if (error) {
      toast.error('Error al consultar los usuarios');
    }
  }, [error]);

  if (loading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      Datos usuarios:
      <table className='tabla'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Identificacion</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.Usuarios.map((u) => {
              return (
                <tr key={u._id}>
                  <td>{u.nombre}</td>
                  <td>{u.apellido}</td>
                  <td>{u.correo}</td>
                  <td>{u.identificacion}</td>
                  <td>{u.rol}</td>
                  <td>{u.estado}</td>
                  <td>
                    <Link to={`/usuarios/editar/${u._id}`}>
                      <i className='fas fa-pen text-indigo-700 hover:text-indigo-400 cursor-pointer' />
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersIndex;
