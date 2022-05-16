import {Button, Col, Container, Image, Row} from "react-bootstrap";
import Card from 'react-bootstrap/Card'
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";

import axios from "axios"
import AppConfig from "../../../../src/appConfig"
import FarmerNavbar from "../../common/nav/FarmerNavbar";

// This is the page for the farmer's dashboard
const Farmer = () => {
  const userID = localStorage.getItem(AppConfig.USER_ID_KEY)
  let url = `${AppConfig.BASE_URL}/product/getProductByUserId/${userID}`;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();

  //This is to get all the products data from the backend that is tied to this farmer
  useEffect(() => {
    console.log("Loading data...");
    axios.get(url).then(response => {
      setData({products: response.data.product});
      setLoading(false);
    }).catch(err => {
      if (err.response.status === 404) {
        setData({products: []})
        setLoading(false)
      }
    });
  }, []);

  //This methods will delete a product (by pressing on the delete button)
  function deleteProduct(productID){
    axios.delete(`${AppConfig.BASE_URL}/product/deleteProduct/${productID}`).then(response => {
      console.log(response);
      window.location.reload();
    })
  }


  //If the products are still loading, just display this instead
  if (isLoading) {
    return (
        <div className="FarmerDashboard">
            <FarmerNavbar/>
            <Container>
              <br>
              </br>
              <Row classname="justify-content-between mt-5" >
                <Col>
                  <h2>Your Shop</h2>
                </Col>
                <Col>
                </Col>
                <Col xs="auto">
                  <Link to="/farmer/add-product">
                    <Button variant="success" size="md">
                      + Add Product
                    </Button>
                  </Link>
                </Col>
              </Row>
              <br></br>
              <br></br>
              <Row xs={3}>
              <h3>LOADING...</h3>
              </Row>
          </Container>
      </div>
    )
  }

  
  //Else once all the product infos have been pulled from the backend, load the dashboard
  return (
      <div className="FarmerDashboard">
          <FarmerNavbar/>
          <Container>
            <br>
            </br>
            <Row classname="justify-content-between mt-5" >
              <Col>
                <h2>Your Shop</h2>
              </Col>
              <Col>
              </Col>
              <Col xs="auto">
                <Link to="/farmer/add-product">
                  <Button variant="success" size="md">
                    + Add Product
                  </Button>
                </Link>
              </Col>
            </Row>
            <br></br>
            <br></br>
            <Row xs={1} md={2} lg={3}>
              {data.products.map(product => (
                  <Col>
                      <Card className="mt-4">
                          <Card.Body>
                              <Row className='d-flex justify-content-center' style={{height: '200px'}}>
                                <Image style={{maxHeight: '100%', width: 'auto'}} src={product.product_image} alt="Card image cap"/>
                              </Row>
                              <Card.Title className={"text-center mt-3"} tag="h5">{product.product_name}</Card.Title>
                            <Card.Subtitle tag="h6" className="mb-2 text-muted"><span className="fw-bold">Price: </span>{product.product_price}</Card.Subtitle>
                              <Card.Text>{product.product_description}</Card.Text>
                            <div className="d-flex justify-content-end">
                              <Link to="/farmer/edit-product" state={product.product_id}>
                                <Button className="me-2">Edit</Button>
                              </Link>
                              <Button variant="danger" onClick={() => deleteProduct(product.product_id)}>Delete</Button>
                            </div>
                          </Card.Body>
                      </Card>
                  </Col>
              ))}
            </Row>
        </Container>
    </div>
  )
}

export default Farmer;



