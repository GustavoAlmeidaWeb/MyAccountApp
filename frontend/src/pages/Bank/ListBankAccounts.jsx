import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useResetAccountMessage } from '@src/hooks/useResetMessage';
import { getAccountsByUser, deleteAnAccount, postNewAccount, getBankList } from '@src/slices/accountSlice';
import { Row, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddNewBankAccount from './AddNewBankAccount';
import ListBankItem from './ListBankItem';
import Loading from '@src/components/Loading';
import Message from '@src/components/Message';

const ListBankAccounts = () => {

  const { loading, accounts, message, error, bank } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const resetMessage = useResetAccountMessage(dispatch);

  const [show, setShow] = useState(false);

  // Get bank accounts on page load
  useEffect(() => {
    dispatch(getAccountsByUser());
    dispatch(getBankList());
  }, [dispatch]);

  // Dispatch to delete an account
  const handleDelete = async (id) => {
    await dispatch(deleteAnAccount(id));
    dispatch(getAccountsByUser());
    resetMessage();
  }

  // Dispatch a new bank account
  const handleSubmit = async (data) => {
    await dispatch(postNewAccount(data));
    dispatch(getAccountsByUser());
    resetMessage();
  }

  if(loading) {
    return <Loading />;
  }

  return (
    <Row>
      <div className='d-flex justify-content-between align-items-center border-bottom pb-3 my-3'>
        <h3 className='display-6'>Suas contas bancárias</h3>
        <OverlayTrigger key='top' placement='top' overlay={<Tooltip>Adicionar Nova Conta</Tooltip>}>
          <Button variant='primary' onClick={() => setShow(true)}><FontAwesomeIcon icon="fa-solid fa-plus" /></Button>
        </OverlayTrigger>
        <AddNewBankAccount show={show} setShow={setShow} handleSubmit={handleSubmit} bankList={bank} />
      </div>
      <div>
        {accounts && accounts.length > 0 ? (<>
          {accounts.map((account) => <ListBankItem key={account._id} account={account} handleDelete={handleDelete} />)}
        </>) : (<>
          <h3 className='text-center'>Nenhuma conta bancária cadastrada.</h3>
        </>)}
      </div>
      {message && <Message msg={message} type='success' />}
      {error && <Message msg={error} type='danger' />}
    </Row>
  )
}

export default ListBankAccounts;
