// Hooks + Router
import { NavLink } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { logout, resetAuthStates } from '../slices/authSlice';

// Bootstrap + FontAwesome
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Navigation = ({ auth }) => {

  const dispatch = useDispatch();
  const reset = resetAuthStates();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <NavLink className="navbar-brand" to="/">UserAccount</NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '200px' }} navbarScroll>
            {!auth ? (
              <>
                <NavLink className="nav-link" to='/cadastro'><FontAwesomeIcon icon="fa-solid fa-file-circle-plus" /> Cadastrar-se</NavLink>
                <NavLink className="nav-link" to='/login'><FontAwesomeIcon icon="fa-solid fa-right-to-bracket" /> Login</NavLink>
              </>
            ) : (
              <>
                <NavLink className="nav-link" to='/'><FontAwesomeIcon icon="fa-solid fa-gauge" /> Home</NavLink>
                <NavLink className="nav-link" onClick={handleLogout}><FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /> Sair</NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation;
