import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ListBankItem = ({ account, handleDelete }) => {
  return (
    <div className='d-flex justify-content-between align-items-center mb-4'>
      <div>
        <h4 className='h5'>{account.bankName}</h4>
        <p className='mb-1'><strong className='badge bg-secondary text-wrap'>Agência:</strong> {account.bankAgency} - <strong className='badge bg-primary text-wrap'>Nº da Conta:</strong> {account.bankAccount}</p>
        <p><strong className='badge bg-primary text-wrap'>Chave PIX:</strong> {account.bankPix}</p>
      </div>
      <div>
        <OverlayTrigger key='top' placement='top' overlay={<Tooltip>Excluir essa Conta</Tooltip>}>
          <Button variant='danger' onClick={() => handleDelete(account._id)}><FontAwesomeIcon icon="fa-regular fa-trash-can" /></Button>
        </OverlayTrigger>
      </div>
    </div>
  )
}

export default ListBankItem;
