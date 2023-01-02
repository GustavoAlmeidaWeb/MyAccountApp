import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { getCurrentUser, updateUserProfile, deleteUserProfile } from '@src/slices/userSlice';
import { logout } from '@src/slices/authSlice';
import { useResetUserMessage } from '@src/hooks/useResetMessage';
import { uploads } from '@src/utils/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Message from '@src/components/Message';
import Loading from '@src/components/Loading';


const MyProfile = () => {

  const { user, loading, error, message } = useSelector((state) => state.user);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [previewImage, setPreviewImage] = useState('');
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');
  const [activePass, setActivePass] = useState(false);

  const dispatch = useDispatch();
  const resetMessage = useResetUserMessage(dispatch);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {

    if(user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
    }

  },[user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = {
      name,
      phone,
    }

    if(previewImage) {
      newData.image = previewImage;
    }

    if(currentPass) {
      newData.currentPassword = currentPass;
      newData.newPassword = newPass;
      newData.confirmNewPassword = confirmNewPass;
    }

    const formData = new FormData();
    Object.keys(newData).forEach((key) => formData.append(key, newData[key]));

    dispatch(updateUserProfile(formData));
    resetMessage();
  }

  const handleFile = (e) => {

    // Image preview
    const img = e.target.files[0];
    setPreviewImage(img);
  }

  const handleDelete = () => {

    dispatch(deleteUserProfile());

    setTimeout(() => {
      resetMessage();
      dispatch(logout()).then(() => {
        navigate('/');
      });
    }, 2000);

  }

  const handleSwitch = () => {
    if(activePass) {
      setActivePass(false);
      setCurrentPass('');
      setNewPass('');
      setConfirmNewPass('');
    } else {
      setActivePass(true);
    }
  }

  if(loading) {
    return <Loading />;
  }

  return (
    <Row>
      <Col className='text-center mb-3'>
        {(previewImage || user.image) ? (<>
          <img className='rounded w-50' src={previewImage ? URL.createObjectURL(previewImage) : `${uploads}/users/${user.image}`} alt={user.name} />
        </>) : (<>
          <img className='rounded w-50' src='https://via.placeholder.com/250' alt={user.name} />
        </>)}
      </Col>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Trocar imagem de perfil</Form.Label>
          <Form.Control type="file" onChange={handleFile} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" value={name || ''} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>E-mail</Form.Label>
          <Form.Control type="email" value={email || ''} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Telefone</Form.Label>
          <Form.Control type="text"  value={phone || ''} onChange={(e) => setPhone(e.target.value)} />
        </Form.Group>
        <Form.Group className='d-flex align-items-center my-4'>
          <h3 className='h4'>Deseja alterar sua senha ?</h3>
          <Form.Check className='ms-2' type="switch" id="custom-switch" onChange={handleSwitch} />
        </Form.Group>
        {activePass && (<>
          <Form.Group className="mb-3">
            <Form.Label>Senha atual</Form.Label>
            <Form.Control type="password" onChange={(e) => setCurrentPass(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nova Senha</Form.Label>
            <Form.Control type="password" onChange={(e) => setNewPass(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirmação da nova Senha</Form.Label>
            <Form.Control type="password" onChange={(e) => setConfirmNewPass(e.target.value)} />
          </Form.Group>
        </>)}
        <div className="d-flex justify-content-between">
          {!loading && (<>
            <Button variant='primary' type='submit'><FontAwesomeIcon icon="fa-regular fa-square-check" /> Atualizar dados</Button>
            <Button variant='danger' onClick={handleDelete}><FontAwesomeIcon icon="fa-regular fa-trash-can" /> Excluir conta</Button>
          </>)}
          {loading && (<>
            <Button variant='primary' type='submit' disabled ><FontAwesomeIcon icon="fa-regular fa-hourglass" /> Aguarde...</Button>
            <Button variant='danger' onClick={handleDelete} disabled ><FontAwesomeIcon icon="fa-regular fa-hourglass" /> Aguarde...</Button>
          </>)}
        </div>
      </Form>
      {error && <Message msg={error} type='danger' />}
      {message && <Message msg={message} type='success' />}
    </Row>
  )
}

export default MyProfile
