import { gql } from '@apollo/client';

const EDIT_USER = gql`
  mutation EditarUsuario(
    $_id: String!
    $nombre: String
    $apellido: String
    $correo: String
    $estado: Enum_EstadoUsuario
  ) {
    editarUsuario(
      _id: $_id
      nombre: $nombre
      apellido: $apellido
      correo: $correo
      estado: $estado
    ) {
      _id
      nombre
      apellido
      correo
      rol
      estado
    }
  }
`;

const CREATE_USER = gql`
  mutation CrearUsuario(
    $nombre: String!
    $apellido: String!
    $correo: String!
    $rol: Enum_Rol!
  ) {
    crearUsuario(
      nombre: $nombre
      apellido: $apellido
      correo: $correo
      rol: $rol
    ) {
      _id
    }
  }
`;

export { EDIT_USER, CREATE_USER };
