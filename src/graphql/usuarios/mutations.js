import { gql } from '@apollo/client';

const EDIT_USER = gql`
  mutation EditarUsuario(
    $_id: String!
    $nombre: String
    $apellido: String
    $correo: String
    $identificacion: String
  ) {
    editarUsuario(
      _id: $_id
      nombre: $nombre
      apellido: $apellido
      correo: $correo
      identificacion: $identificacion
    ) {
      _id
      nombre
      apellido
      correo
      identificacion
      rol
      estado
    }
  }
`;

export {EDIT_USER};