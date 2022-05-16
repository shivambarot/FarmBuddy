import MainNavbar from "../../common/nav/mainNavbar";
import {Container, Image, Row} from "react-bootstrap";

import './index.scss'

const AboutUs = () => {
  return (
    <div>
      <MainNavbar/>

      <Container className="about-us min-height">

        <Row className="justify-content-center img-wrapper">
            <Image fluid src="/about-us.png"/>
        </Row>
        <Row className="mt-4 text-center">
          <h3>About</h3>
        </Row>
        <Row className="mt-4">
          <div>
            FarmBuddy’s goal is to connect the Halifax public to local farmers. We believe that
            being connected to your community is very important and that is why we see the
            value in buying local. We are currently a start-up business that was started in Halifax,
            Nova Scotia. We hope to grow our locations in the future in order to connect more communities to their local farmers. We hope that you enjoy!
          </div>
        </Row>
      </Container>
    </div>
  )
}
export default AboutUs;