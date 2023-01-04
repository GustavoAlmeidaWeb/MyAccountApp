import { useState } from 'react';
import { Modal, Button, Col, Row, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddNewBankAccount = ({ show, setShow, handleSubmit, bankList }) => {

  const [bankName, setBankName] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [bankAgency, setBankAgency] = useState('');
  const [bankPix, setBankPix] = useState('');

  const handleForm = (e) => {
    e.preventDefault();

    const bankData = {
      bankName,
      bankAgency,
      bankAccount,
      bankPix,
    }

    handleSubmit(bankData);
  }

  return (
    <Modal size='lg' show={show} onHide={() => setShow(false)} backdrop='static'>
      <Modal.Header closeButton>
        <Modal.Title><FontAwesomeIcon icon="fa-regular fa-map" /> Preencha com as informações do seu banco.</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleForm}>
        <Modal.Body>
          <Row>
            <Form.Group as={Col} md="12" className='mb-3'>
              <Form.Label>Selecione o Banco</Form.Label>
              <Form.Select onChange={(e) => setBankName(e.target.value)} value={bankName || ''} >
                <option>Selecione o banco aqui</option>
                {bankList && bankList.length > 0 ? (<>
                  {bankList.map((bank) => <option key={bank.name} value={bank.code ? `${bank.code} - ${bank.name}` : bank.name}>{bank.code ? `${bank.code} - ${bank.name}` : bank.name}</option>)}
                </>) : (<>
                  <option disabled>Aguarde...</option>
                </>)}
              </Form.Select>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="6" className='mb-3'>
              <Form.Label>Agência</Form.Label>
              <Form.Control type="text" onChange={(e) => setBankAgency(e.target.value)} value={bankAgency || ''}/>
            </Form.Group>
            <Form.Group as={Col} md="6" className='mb-3'>
              <Form.Label>Nº da Conta</Form.Label>
              <Form.Control type="text" onChange={(e) => setBankAccount(e.target.value)} value={bankAccount || ''} />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="12" className='mb-3'>
              <Form.Label>Chave PIX</Form.Label>
              <Form.Control type="text" onChange={(e) => setBankPix(e.target.value)} value={bankPix || ''} />
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}><FontAwesomeIcon icon="fa-solid fa-xmark" /> Fechar</Button>
          <Button variant="primary" type='submit' onClick={() => setShow(false)}><FontAwesomeIcon icon="fa-regular fa-floppy-disk" /> Salvar nova Conta Bancária</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddNewBankAccount
