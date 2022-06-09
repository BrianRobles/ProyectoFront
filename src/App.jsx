import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
import { Auth0Provider } from '@auth0/auth0-react';
import UsersIndex from './pages/usuarios/Index';
import PrivateLayout from './layout/PrivateLayout';
import EditarUsuario from './pages/usuarios/Editar';
import Index from './pages/Index';
import Loading from './components/Loading';
import Login from './pages/Login';
import ToLogin from './pages/ToLogin';

function App() {
  const httpLink = new HttpLink({
    uri: 'https://gestion-proyectos-br.herokuapp.com/graphql',
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${localStorage.getItem('token') || null}`,
      },
    }));

    return forward(operation);
  });

  const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <Auth0Provider
      domain='gestionproyectos.us.auth0.com'
      clientId='FkugUesQe25fGAFzIcE285cmpz8IxuOf'
      redirectUri='https://gestion-proyectos-fr.herokuapp.com/toLogin'
      // redirectUri='http://localhost:3000/toLogin'
      audience='https://gestion-proyectos/graphql'
    >
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path='/loading' element={<Loading />} />
            <Route path='/' element={<PrivateLayout />}>
              <Route path='' element={<Index />} />
              <Route path='toLogin' element={<ToLogin />} />
              <Route path='login' element={<Login />} />
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
