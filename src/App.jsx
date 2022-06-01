import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { setContext } from 'apollo-link-context';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
import { Auth0Provider } from '@auth0/auth0-react';
import UsersIndex from './pages/usuarios/Index';
import PrivateLayout from './layout/PrivateLayout';
import EditarUsuario from './pages/usuarios/Editar';
import Index from './pages/Index';
import Loading from './components/Loading';
import Register from './pages/Register';

const link = new HttpLink({
  uri: 'https://gestion-proyectos-br.herokuapp.com/graphql',
});

const headerLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
}));

const client = new ApolloClient({
  link: headerLink.concat(link),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Auth0Provider
      domain='gestionproyectos.us.auth0.com'
      clientId='FkugUesQe25fGAFzIcE285cmpz8IxuOf'
      redirectUri='http://localhost:3000/usuarios'
      audience='https://gestion-proyectos/graphql'
    >
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/loading' element={<Loading />} />
            <Route path='/' element={<PrivateLayout />}>
              <Route path='' element={<Index />} />
              <Route path='usuarios' element={<UsersIndex />} />
              <Route path='usuarios/editar/:_id' element={<EditarUsuario />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </Auth0Provider>
  );
}

export default App;
