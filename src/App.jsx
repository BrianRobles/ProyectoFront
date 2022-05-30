import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Auth0Provider } from '@auth0/auth0-react';
import UsersIndex from './pages/usuarios/Index';
import PrivateLayout from './layout/PrivateLayout';
import EditarUsuario from './pages/usuarios/Editar';
import Index from './pages/Index';

const client = new ApolloClient({
  uri: 'https://gestion-proyectos-br.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Auth0Provider
      domain='gestionproyectos.us.auth0.com'
      clientId='hxKkWXgcZHiy7UYDTPYwJPJ35itsig79'
      redirectUri={window.location.origin}
    >
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
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
