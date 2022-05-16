import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";

import "./index.scss"
import { useEffect, useState } from "react";
import axios from "axios";
import AppConfig from "../../../../../appConfig";
import CartService from "../../../../../externalServices/cartService";
import CustomerNavbar from "../../../../common/nav/CustomerNavbar";

//maitaining the user cart 
const Cart = () => {
  const [cartProducts, setCartProducts] = useState({})
  const user_id = localStorage.getItem(AppConfig.USER_ID_KEY);

  const calculateTotal = () => {
    let total = 0;
    Object.keys(cartProducts).map(product_id => {
      if (cartProducts[product_id] !== undefined) total += cartProducts[product_id].cart_amount;
    })
    return total.toFixed(2)
  }

  const getProductsLength = () => {
    let products = Object.values(cartProducts).filter(product => {
      if (product !== undefined) return product
    })
    return products.length
  }

  const removeProduct = (product) => {
    CartService.deleteProductFromCart(product, user_id).then(res => {
      setCartProducts({ ...cartProducts, [product.product_id]: undefined });
    })
  }
  useEffect(() => {
    const userID = localStorage.getItem(AppConfig.USER_ID_KEY)
    let cart_url = `${AppConfig.BASE_URL}/cart/getUserCart/${userID}`;
    axios.get(cart_url)
      .then((response) => {
        const cartObjs = {}
        const cartList = response.data.cartList;
        cartList.forEach(cartObj => {
          if (Object.keys(cartObjs).includes(cartObj.product_id)) {
            cartObjs[cartObj.product_id].quantity += cartObj.quantity;
            cartObjs[cartObj.product_id].cart_amount += cartObj.cart_amount;
          } else {
            cartObjs[cartObj.product_id] = cartObj;
          }
        })
        setCartProducts(cartObjs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <CustomerNavbar />
      <Container className="cart-wrapper min-height">
        <h3 className="mt-4 mb-5">Cart Items</h3>
        {getProductsLength() === 0 ? <div>No Products added.</div> : ''}
        {Object.values(cartProducts).map(product => {
          return product === undefined ? ''
            : (
              <Card key={product.product_id} className="cart mt-3">
                <Card.Body>
                  <Row className="align-items-center justify-content-center item">
                    <Col xs={12} md={5} className="item-name-pic d-flex flex-column">
                      <Col xs="auto" className="d-flex flex-column align-items-center">
                        <Image height="70px" src={product.product_image} />
                        <div className="fw-bold">{product.product_name}</div>
                      </Col>

                    </Col>
                    <Col className="mt-3">
                      <span>Price: </span>
                      <span>{product.price}</span>
                    </Col>
                    <Col className="mt-3">
                      <span>Qty: </span>
                      <span>{product.quantity}</span>
                    </Col>
                    <Col className="mt-3">
                      <span>Amount: </span>
                      <span>{product.cart_amount}</span>
                    </Col>
                    <Col xs={12} md={2} lg className="d-flex justify-content-center mt-3 remove">
                      <Button onClick={() => removeProduct(product)} variant="danger">Remove</Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )
        })}
        <Row className="text-end me-3 mt-5 text-">
          <div className="total">
            <span className="fw-bolder">Total: </span>
            {calculateTotal()}
          </div>
        </Row>
        <div className="d-flex justify-content-center my-5">
          <Button href="/customer/dashboard" className="me-3" variant="outline-secondary">Cancel</Button>
          <Button disabled={getProductsLength() === 0} href="/customer/checkout" variant="success">Checkout</Button>
        </div>
      </Container>
    </div>
  )
}

export default Cart;