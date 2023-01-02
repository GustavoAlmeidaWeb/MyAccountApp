import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '@src/slices/userSlice';
import { Col, Row } from 'react-bootstrap';
import { uploads } from '@src/utils/config';
import Loading from '@src/components/Loading';

const Home = () => {

  const { loading, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  if(loading) {
    return <Loading />;
  }

  return (
    <Row className='d-flex align-items-center'>
      {user && (
        <>
        <Col md={2} sm={3} xs={12}>
          {user && user.image ? (<>
            <img src={`${uploads}/users/${user.image}`} alt={user.name} className='rounded-circle' />
          </>) : (<>
            <img src='https://via.placeholder.com/250' alt={user.name} className='rounded-circle' />
          </>)}
        </Col>
        <Col md={10} sm={9} xs={12}>
          <h3 className='display-6'>Bem vindo, {user.name}</h3>
          <p>Para editar sua conta clique no link ao lado, <Link to='/minha-conta'>Minha conta</Link></p>
        </Col>
        </>
      )}
    </Row>
  )
}

export default Home
