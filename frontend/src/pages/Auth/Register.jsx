import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Form, Button, FloatingLabel } from 'react-bootstrap';
import { register } from '@src/slices/authSlice';
import { useResetAuthMessage } from '../../hooks/useResetMessage';
import Message from '@src/components/Message';
import Loading from '@src/components/Loading';

const Register = () => {

  const { loading, error, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const resetMessage = useResetAuthMessage(dispatch);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      phone,
      password,
      confirmpassword: confirmPassword,
    }

    dispatch(register(user)).then(() => {
      resetMessage();
    });

  }

  if(loading) {
    return <Loading />;
  }

  return (
    <Row>
      <div className="text-center mb-4">
        <h2 className='display-4 mb-3'>Realize seu cadastro</h2>
        <p>Faça seu cadastro e guarde seus dados...</p>
      </div>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingInput" label="Nome completo" className="mb-3 text-dark" >
          <Form.Control type='text' placeholder='Nome completo' value={name || ''} onChange={(e) => setName(e.target.value)} />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="E-mail" className="mb-3 text-dark" >
          <Form.Control type='email' placeholder='E-mail' value={email || ''} onChange={(e) => setEmail(e.target.value)} />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Telefone" className="mb-3 text-dark" >
          <Form.Control type='phone' placeholder='Telefone' value={phone || ''} onChange={(e) => setPhone(e.target.value)} />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Senha" className="mb-3 text-dark" >
          <Form.Control type='password' placeholder='Senha' value={password || ''} onChange={(e) => setPassword(e.target.value)} />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Confirme sua Senha" className="mb-3 text-dark" >
          <Form.Control type='password' placeholder='Confirme sua Senha' value={confirmPassword || ''} onChange={(e) => setConfirmPassword(e.target.value)} />
        </FloatingLabel>
        <Form.Label className="d-grid">
          {!loading && <Button type="submit" size="lg" variant="primary">Cadastrar</Button>}
          {loading && <Button type="submit" size="lg" variant="primary" disabled>Aguarde...</Button>}
          {error && <Message msg={error} type='danger'/>}
          {message && <Message msg={message} type='success'/>}
        </Form.Label>
      </Form>
      <p className="text-center">Já tem sua conta ? <Link to="/login">Clique Aqui</Link></p>
    </Row>
  )
}

export default Register;
