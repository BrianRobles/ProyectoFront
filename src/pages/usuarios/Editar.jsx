import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import { GET_USER } from '../../graphql/usuarios/queries';
import { EDIT_USER } from '../../graphql/usuarios/mutations';
import Input from '../../components/Input';
import ButtonLoading from '../../components/ButtonLoading';
import Dropdown from '../../components/Dropdown'
import useFormData from '../../hooks/useFormData';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';

const EditarUsuario = () => {
  const EstadoUsuario = {
    PENDIENTE: 'Pendiente',
    AUTORIZADO: 'Autorizado',
    NO_AUTORIZADO: 'No autorizado',
  };

  const { _id } = useParams();
  const { form, formData, updateFormData } = useFormData(null);

  const [
    editUser,
    { loading: mutationLoading, data: mutationData, error: mutationError },
  ] = useMutation(EDIT_USER);

  const {
    loading: queryLoading,
    data: queryData,
    error: queryError,
  } = useQuery(GET_USER, {
    variables: { _id },
  });

  const submitForm = (e) => {
    e.preventDefault();
    editUser({
      variables: { _id, ...formData },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Información actualizada con exito');
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error al actualizar la información del usuario');
    }

    if (queryError) {
      toast.error('Error al cargar la información del usuario');
    }
  }, [mutationError, queryError]);

  if (queryLoading) return <Loading/>;
  if (queryError) return <div>{queryError.message}</div>;

  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/usuarios'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>
        Editar Usuario
      </h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'
      >
        <Input
          label='Nombre de la persona:'
          type='text'
          name='nombre'
          defaultValue={queryData.Usuario.nombre}
          required
        />
        <Input
          label='Apellido de la persona:'
          type='text'
          name='apellido'
          defaultValue={queryData.Usuario.apellido}
          required
        />
        <Dropdown
          label='Estado de la persona:'
          name='estado'
          defaultValue={queryData.Usuario.estado}
          required
          options={EstadoUsuario}
        />
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text='Confirmar'
        />
      </form>
    </div>
  );
};

export default EditarUsuario;
