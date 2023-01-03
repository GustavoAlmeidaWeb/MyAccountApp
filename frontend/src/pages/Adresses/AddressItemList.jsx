import { Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddressItemList = ({ address, handleDelete }) => {

  return (
    <Col className="d-flex justify-content-between align-items-center">
      <div>
        <h4 className="h5">{address.addressStreet}, {address.addressNumber}</h4>
        <p className='mb-0'>{address.addressDistrict} - {address.addressCity}/{address.addressState}</p>
      </div>
      <div>
        <OverlayTrigger key='top' placement='top' overlay={<Tooltip>Excluir endereço</Tooltip>}>
          <button className="btn btn-danger" onClick={() => handleDelete(address._id)}><FontAwesomeIcon icon="fa-regular fa-trash-can" /></button>
        </OverlayTrigger>
      </div>
    </Col>
  )
}

export default AddressItemList;
