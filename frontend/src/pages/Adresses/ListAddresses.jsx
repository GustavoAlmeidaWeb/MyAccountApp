import { useEffect } from 'react';
import { Col, Row, Button, Tabs, Tab, Accordion } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAddressesByUser } from '@src/slices/addressSlice';
import Loading from '@src/components/Loading';

const ListAddresses = () => {

  const { loading, addresses } = useSelector((state) => state.address);
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getAddressesByUser());

  }, [dispatch])

  if(loading) {
    return <Loading />;
  }

  return (
    <Row>
      <div className="my-4 d-flex justify-content-between">
        <h3 className="h2">Lista com seus Endereços</h3>
        <Button variant='primary'>
          <FontAwesomeIcon icon="fa-solid fa-plus" />
        </Button>
      </div>
      {addresses && addresses.length > 0 ? (
        <Accordion defaultActiveKey="0" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header><strong><FontAwesomeIcon icon="fa-solid fa-house" /> Residenciais</strong></Accordion.Header>
            {addresses.map((address) => (
              <>
              {address.addressType === 0 && (
                <Accordion.Body>
                  <p>{address.addressStreet}</p>
                </Accordion.Body>
              )}
              </>
            ))}
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header><strong><FontAwesomeIcon icon="fa-solid fa-building" /> Comerciais</strong></Accordion.Header>
            {addresses.map((address) => (
              <>
              {address.addressType === 1 && (
                <Accordion.Body>
                  <p>{address.addressStreet}</p>
                </Accordion.Body>
              )}
              </>
            ))}
          </Accordion.Item>
        </Accordion>
      ) : (
        <Col>
            <p>Nenhum Endereço Cadastrado.</p>
        </Col>
      )}
    </Row>
  )
}

export default ListAddresses
