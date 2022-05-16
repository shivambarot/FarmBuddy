import {Alert, Button, Card, Col, Container, FloatingLabel, Form, InputGroup, Row} from "react-bootstrap";
import MainNavbar from "../../common/nav/mainNavbar";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

import './index.scss'
import UserService from "../../../externalServices/userService";
import {useState} from "react";
import AppConfig from "../../../appConfig";


const Register = () => {
  const { register, formState: { errors }, handleSubmit, watch} = useForm();
  const [serverError, setServerError] = useState(null)
  const navigate = useNavigate();

  let currentPassword = watch("password");
  const onSubmit = data => {
    UserService.register(data).then(result => {
      setServerError(null);
      localStorage.setItem(AppConfig.USER_TOKEN, result.data.access_token)
      localStorage.setItem(AppConfig.USER_ID_KEY, result.data.user_id)
      localStorage.setItem(AppConfig.USER_TYPE_KEY, result.data.user_type)

      if(result.data.user_type === 'customer') {
        navigate('/customer/dashboard');
      } else {
        navigate('/farmer/dashboard');
      }
    }).catch(error => {
      setServerError(error.response.data.msg)
    })
  }
  return (
    <div>
      <MainNavbar/>
      <Container>
        <Card className="form-card">
          <Card.Body>
            <Card.Title className="text-center">Registration</Card.Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FloatingLabel className="mt-4" label="Full Name">
                <Form.Control
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Full Name"
                  isInvalid={errors.name?.type === 'required'}
                />
                <Form.Control.Feedback type="invalid">Name is required</Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel className="mt-4" label="Email Address">
                <Form.Control
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Email Address"
                  isInvalid={errors.email?.type === 'required'}
                />
                <Form.Control.Feedback type="invalid">Email is required</Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel className="mt-4" label="Password">
                <Form.Control
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="Password"
                  isInvalid={errors.password?.type === 'required'}
                />
                <Form.Control.Feedback type="invalid">Password is required</Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel className="mt-4" label="Confirm Password">
                <Form.Control
                  {...register("confirmPassword", { validate: value => value === currentPassword })}
                  type="password"
                  placeholder="Confirm Password"
                  isInvalid={errors.confirmPassword?.type === 'validate'}
                />
                <Form.Control.Feedback type="invalid">Password does not match</Form.Control.Feedback>
              </FloatingLabel>
              <InputGroup>
                <Form.Check
                  className="mt-4"
                  defaultChecked={true}
                  inline label="Farmer" {...register("user_type", { required: true })}
                  type="radio" value="farmer"
                />
                <Form.Check
                  className="mt-4"
                  inline label="Customer" {...register("user_type", { required: true })}
                  type="radio" value="customer"
                />
              </InputGroup>

              <Row className="px-3">
                <Button type="submit" className="mt-4" variant="success">Register</Button>
              </Row>
              <Row className="mt-4 justify-content-center">
                <Col className="pe-0" xs="auto">Already registered? </Col>
                <Col className="ps-1" xs="auto">
                  <Link to="/login">Login</Link>
                </Col>
              </Row>
              <Alert show={serverError !== null} variant="danger" className="mt-4 p-2 text-center">
                {serverError}
              </Alert>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>

  )
}
export default Register;