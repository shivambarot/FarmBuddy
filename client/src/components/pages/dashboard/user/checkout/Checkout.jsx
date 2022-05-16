import {Button, Container, FloatingLabel, Form, Row, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {useState} from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './index.scss'
import SuccessModal from "./SuccessModal";
import OrderService from "../../../../../externalServices/orderService";
import CustomerNavbar from "../../../../common/nav/CustomerNavbar";
import AppConfig from "../../../../../appConfig";


const Checkout = () => {
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState("");
  const [error, setError] = useState(false)
  const [deliveryType, setDeliveryType] = useState("delivery")
  const user_id = localStorage.getItem(AppConfig.USER_ID_KEY);

  const onChange = (e) => {
    const value = e.target.value;
    if (value.length > 0) {
      setError(false)
    }
    setAddress(value)
  }
  const handleToggle = (type) => {
    if (type === "delivery") {
      setAddress("")
    } else {
      setAddress("1111 South St, Halifax, B3H 1P3")
    }
    setDeliveryType(type)
  }
  const onClick = () => {
    if(address === "" && deliveryType === "delivery") {
      setError(true)
    } else {
      OrderService.processOrder(user_id).then(res => {
        setShow(true)
      }).catch(err => {
        console.log(err)
      })
    }
  }
  return (
    <div className="checkout">
      <CustomerNavbar/>
      <Container className="mt-5">
        <Row >
          <ToggleButtonGroup
            className="justify-content-center"
            name="deliveryType"
            type="radio"
            value={deliveryType}
          >
            <ToggleButton
              variant="outline-secondary"
              onClick={() => handleToggle("delivery")}
              value="delivery"
              className="delivery-type"
            >
              Delivery
            </ToggleButton>
            <ToggleButton
              variant="outline-secondary"
              onClick={() => handleToggle("pickup")}
              value="pickup"
              className="delivery-type"
            >
              Pick up
            </ToggleButton>
          </ToggleButtonGroup>
        </Row>
        <FloatingLabel className="mt-4 mx-auto address" label="Address">
          <Form.Control
            onChange={onChange}
            type="text"
            value={address}
            disabled={deliveryType === "pickup"}
            placeholder="Address"
            isInvalid={error}
          />
          <Form.Control.Feedback type="invalid">Address is required</Form.Control.Feedback>
        </FloatingLabel>
        <Row className="justify-content-center mt-4">
          <Calendar onChange={setDate} value={date} />
        </Row>
        <Row className="mt-4 justify-content-center">
          <Button onClick={onClick} className="confirm" variant="success">Confirm</Button>
        </Row>
        <SuccessModal
          show={show}
          setShow={setShow}
          date={date.toDateString()}
          address={address}
          deliveryType={deliveryType}
        />
      </Container>
    </div>
  )
}

export default Checkout;