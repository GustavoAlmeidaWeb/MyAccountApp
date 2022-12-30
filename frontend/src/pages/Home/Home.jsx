import { useEffect } from 'react';
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

  console.log(user);

  return (
    <Row>
      <Col>
        {user && user.image ? (<>
          <img src={`${uploads}/users/${user.image}`} alt={user.name} />
        </>) : (<>
          <img src="" alt={user.name} />
        </>)}
      </Col>
    </Row>
  )
}

export default Home
