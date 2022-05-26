import React from 'react';
import Input from '../components/Input';
import ButtonLoading from '../components/ButtonLoading'
import useFormData from '../hooks/useFormData';
import Dropdown from '../components/Dropdown'

const Register = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const UserRole = {
    LIDER: 'Lider',
    ESTUDIANTE: 'Estudiante',
    ADMINISTRADOR: 'Administrador',
  }

  const submitForm = (e) => {
    e.preventDefault();
    console.log(formData)
  };

  return (
    <div className='w-4/12 my-0 mx-auto py-12'>
      <form onChange={updateFormData} ref={form} onSubmit={submitForm}>
        <Input label='Nombre' name='nombre' type='text' required/>
        <Input label='Apellido' name='apellido' type='text' required/>
        <Input label='Correo' name='correo' type='text' required/>
        <Input label='Identificacion' name='identificacion' type='text' required/>
        <Dropdown label='Rol deseado' name='rol' options={UserRole}/>
        <ButtonLoading text='Registrarte' disabled={Object.keys(formData).length === 0} loading={false}/>
      </form>
    </div>
  );
};

export default Register;
