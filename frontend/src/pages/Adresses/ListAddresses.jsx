import { useEffect, useState } from 'react';
import { Col, Row, Button, Accordion, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { getAddressesByUser, deleteAnAddress, postNewAddress } from '@src/slices/addressSlice';
import { useResetAddressMessage } from '@src/hooks/useResetMessage';
import AddressItemList from './AddressItemList';
import NewAddressItem from './NewAddressItem';
import Loading from '@src/components/Loading';
import Message from '@src/components/Message';

const ListAddresses = () => {

  const { loading, addresses, message, error } = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const resetAddress = useResetAddressMessage(dispatch);

  // State to open Add new Address Modal
  const [show, setShow] = useState(false);

  // Get addresses on load page
  useEffect(() => {
    dispatch(getAddressesByUser());
  }, [dispatch])

  // Dispatch Delete an Address
  const handleDelete = async (id) => {
    await dispatch(deleteAnAddress(id));
    dispatch(getAddressesByUser());
    resetAddress();
  }

  // Dispatch Add new Address
  const handleSubmit = async (data) => {
    await dispatch(postNewAddress(data));
    dispatch(getAddressesByUser());
    resetAddress();
  }

  // Loading state active this
  if(loading) {
    return <Loading />;
  }

  return (
    <Row className='mb-5'>
      <div className="my-4 d-flex justify-content-between align-items-center">
        <h3 className="h2">Lista com seus Endereços</h3>
        <OverlayTrigger key='top' placement='top' overlay={<Tooltip>Adicionar Novo Endereço</Tooltip>}>
          <Button variant='primary' onClick={() => setShow(true)}><FontAwesomeIcon icon="fa-solid fa-plus" /></Button>
        </OverlayTrigger>
        <NewAddressItem show={show} setShow={setShow} handleSubmit={handleSubmit} />
      </div>
      {addresses && addresses.length > 0 ? (
        <Accordion defaultActiveKey="0" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header><strong><FontAwesomeIcon icon="fa-solid fa-house" /> Residenciais</strong></Accordion.Header>
            {addresses.map((address) => (
              <div key={address._id}>
              {address.addressType === 0 && (
                <Accordion.Body>
                  <AddressItemList address={address} handleDelete={handleDelete} />
                </Accordion.Body>
              )}
              </div>
            ))}
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header><strong><FontAwesomeIcon icon="fa-solid fa-building" /> Comerciais</strong></Accordion.Header>
            {addresses.map((address) => (
              <div key={address._id}>
              {address.addressType === 1 && (
                <Accordion.Body>
                  <AddressItemList address={address} handleDelete={handleDelete} />
                </Accordion.Body>
              )}
              </div>
            ))}
          </Accordion.Item>
        </Accordion>
      ) : (
        <Col>
            <p>Nenhum Endereço Cadastrado.</p>
        </Col>
      )}
      {message && <Message msg={message} type='success' />}
      {error && <Message msg={error} type='danger' />}
    </Row>
  )
}

export default ListAddresses
