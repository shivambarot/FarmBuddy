import {Button, Modal, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import AppConfig from "../../../../../appConfig";

const SuccessModal = (props) => {
  const navigate = useNavigate();
  const user_id = localStorage.getItem(AppConfig.USER_ID_KEY);

  const onClose = () => {
    props.setShow(false)
    navigate('/customer/dashboard')
  }
  return (
    <Modal show={props.show}>
      <Modal.Body className="p-5">
        <h3 className="text-center">Success</h3>
        <div className="my-3">
          Your order {props.deliveryType === "delivery"? "will be delivered" : "can be picked up"} on {props.date} at {props.address}.
        </div>
        <Row className="justify-content-center">
          <Button className="w-50" onClick={onClose} variant="success">Okay</Button>
        </Row>

      </Modal.Body>
    </Modal>
  )
}

export default SuccessModal