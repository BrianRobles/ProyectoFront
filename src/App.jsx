import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import UsersIndex from './pages/usuarios/Index';
import PrivateLayout from './layout/PrivateLayout';
import EditarUsuario from './pages/usuarios/Editar';
import Index from './pages/Index';
import Register from './pages/Register';
import Login from './pages/Login';

const client = new ApolloClient({
  uri: 'https://gestion-proyectos-br.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PrivateLayout />}>
            <Route path='' element={<Index />} />
            <Route path='usuarios' element={<UsersIndex />} />
            <Route path='usuarios/editar/:_id' element={<EditarUsuario />} />
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
