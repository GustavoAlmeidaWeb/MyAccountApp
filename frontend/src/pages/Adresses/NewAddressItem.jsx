import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { getAddressByCep } from '@src/slices/addressSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NewAddressItem = ({ show, setShow, handleSubmit }) => {

  const { address } = useSelector((state) => state.address);
  const dispatch = useDispatch();

  const [zipcode, setZipcode] = useState('');
  const [street, setStreet] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [stNumber, setStNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    if(address) {
      setZipcode(address.cep);
      setStreet(address.street);
      setCity(address.city);
      setUf(address.state);
      setDistrict(address.neighborhood);
    }
  }, [address])

  const handleForm = (e) => {

    e.preventDefault();

    const addressData = {
      addressType: type,
      addressZipcode: zipcode,
      addressStreet: street,
      addressNumber: stNumber,
      addressDistrict: district,
      addressCity: city,
      addressState: uf,
    }

    if(complement) {
      addressData.addressComplement = complement;
    }

    handleSubmit(addressData);
  }

  const handleBlur = (cep) => {
    dispatch(getAddressByCep(cep));
  }

  return (
    <Modal size='lg' show={show} onHide={() => setShow(false)} backdrop='static'>
      <Modal.Header closeButton>
        <Modal.Title>Preencha as informações do endereço abaixo</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleForm}>
        <Modal.Body>
          <Row className='mb-3'>
            <Form.Group as={Col} md="6">
              <Form.Label>Digite seu CEP</Form.Label>
              <Form.Control required type="text" placeholder="Apenas números..." onBlur={(e) => handleBlur(e.target.value)} onChange={(e) => setZipcode(e.target.value)} value={zipcode || ''} />
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Tipo do Endereço</Form.Label>
              <Form.Select aria-label="Default select example" onChange={(e) => setType(e.target.value)}>
                <option>Selecione aqui</option>
                <option value="0">Residencial</option>
                <option value="1">Comercial</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Group as={Col} md="9">
              <Form.Label>Rua</Form.Label>
              <Form.Control required type="text" value={street || ''} readOnly />
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Nº</Form.Label>
              <Form.Control type="text" onChange={(e) => setStNumber(e.target.value)} value={stNumber || ''} />
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Group as={Col} md="6">
              <Form.Label>Complemento</Form.Label>
              <Form.Control type="text" onChange={(e) => setComplement(e.target.value)} value={complement || ''} />
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Bairro</Form.Label>
              <Form.Control required type="text" value={district || ''} readOnly />
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Group as={Col} md="8">
              <Form.Label>Cidade</Form.Label>
              <Form.Control required type="text" value={city || ''} readOnly />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Estado</Form.Label>
              <Form.Control required type="text" value={uf || ''} readOnly />
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Fechar</Button>
          <Button variant="primary" type='submit' onClick={() => setShow(false)}>Salvar novo Endereço</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )

}

export default NewAddressItem;
