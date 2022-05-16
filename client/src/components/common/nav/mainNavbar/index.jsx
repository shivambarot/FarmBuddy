import {Container, Image, Nav, Navbar} from "react-bootstrap";

import './index.scss'
import ContactModal from "../../../pages/contactModal";
import {useState} from "react";

const MainNavbar = ({ children }) => {
  const [show, setShow] = useState(false);

  const onClick = () => {
    setShow(true)
  }
  return (
    <Navbar expand="md" className="main-nav" bg="success" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/" className="d-flex">
          <Image className="me-1" src="/logo.svg" />
          <span className="mt-1">FarmBuddy</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto d-flex options">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link onClick={onClick}>Contact us</Nav.Link>
            {children}
          </Nav>
        </Navbar.Collapse>
        <ContactModal show={show} onClose={() => setShow(false)} />
      </Container>
    </Navbar>
  )

}

export default MainNavbar;