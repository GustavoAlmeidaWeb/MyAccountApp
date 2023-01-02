import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useAuth } from './hooks/useAuth';

// Components
import Navigation from './components/Navigation';

// Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Home/Home';
import NotFound from './pages/404/NotFound';
import ListAddresses from './pages/Adresses/ListAddresses';
import ListBankAccounts from './pages/Bank/ListBankAccounts';
import MyProfile from './pages/Profile/MyProfile';

function App() {

  const { auth, loading } = useAuth();

  return (
    <>
    <Navigation auth={auth} />
    <Container fluid className="my-3">
      <Container>
        <Routes>
          <Route path='/' element={auth ? <Home /> : <Navigate to='/login' />} />
          <Route path='/enderecos' element={auth ? <ListAddresses /> : <Navigate to='/login' />} />
          <Route path='/minha-conta' element={auth ? <MyProfile /> : <Navigate to='/login' />} />
          <Route path='/contas-bancarias' element={auth ? <ListBankAccounts /> : <Navigate to='/login' />} />
          <Route path='/login' element={!auth ? <Login /> : <Navigate to='/' />} />
          <Route path='/cadastro' element={!auth ? <Register /> : <Navigate to='/' />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Container>
    </Container>
    </>
  )
}

export default App
