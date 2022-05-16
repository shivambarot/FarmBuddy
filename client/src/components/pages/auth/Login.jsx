import {Alert, Button, Card, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import MainNavbar from "../../common/nav/mainNavbar";
import {Link, Navigate, useNavigate} from "react-router-dom";
import UserService from "../../../externalServices/userService";
import {useForm} from "react-hook-form";

import './index.scss'
import {useState} from "react";
import AppConfig from "../../../appConfig";


const Login = () => {
  const { register, formState: { errors }, handleSubmit} = useForm();
  const [serverError, setServerError] = useState(null)
  const navigate = useNavigate();
  const userType = localStorage.getItem(AppConfig.USER_TYPE_KEY)
  console.log(userType)
  if (userType === 'customer') return <Navigate to="/customer/dashboard"/>
  if (userType === 'farmer') return <Navigate to="/farmer/dashboard"/>
  const onSubmit = data => {
    UserService.login(data).then(result => {
      setServerError(null);
      const user = result.data.user;
      localStorage.setItem(AppConfig.USER_TOKEN, result.data.access_token)
      localStorage.setItem(AppConfig.USER_ID_KEY, user.user_id)
      localStorage.setItem(AppConfig.USER_TYPE_KEY, user.user_type)
      console.log(result.data)
      if(user.user_type === 'customer') {
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
            <Card.Title className="text-center">Login</Card.Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FloatingLabel className="mt-5" label="Email Address">
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
              {/*<Row>*/}
              {/*  <Link className="ms-2 mt-1"  to="/">Forgot password</Link>*/}
              {/*</Row>*/}
              <Row className="mt-4 px-3">
                <Button type="submit" className="mt-4" variant="success">Login</Button>
              </Row>
              <Row className="mt-4 justify-content-center">
                <Col className="pe-0" xs="auto">Not registered? </Col>
                <Col className="ps-1" xs="auto">
                  <Link to="/register">Register Now</Link>
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
export default Login;