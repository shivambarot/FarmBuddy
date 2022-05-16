import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import { Button, Container } from 'react-bootstrap'
import axios from 'axios';
import AppConfig from "../../../../appConfig";
import CartService from "../../../../externalServices/cartService";

const BASE_URL = AppConfig.BASE_URL

//listing all the products
export default function Listingproducts() {

  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState({})
  const [productQuantity, setProductQuantity] = useState({})


  const user_id = localStorage.getItem(AppConfig.USER_ID_KEY);


  const getQuantity = (product, products) => {
    if (Object.keys(products).includes(product.product_id)) {
      return products[product.product_id] !== undefined ? products[product.product_id] : 0;
    } else return 0;
  }

  // method to display all the items
  useEffect(() => {
    let api_url = `${BASE_URL}/product/getAllProducts`;
    axios.get(api_url)
      .then((response) => {
        setProducts(response.data["products"]);
      })
      .catch((error) => {
        console.log(error);
      });

    const userID = localStorage.getItem(AppConfig.USER_ID_KEY)
    let cart_url = `${BASE_URL}/cart/getUserCart/${userID}`;
    axios.get(cart_url)
      .then((response) => {
        const cartObjs = {}
        const cartList = response.data.cartList;
        cartList.forEach(cartObj => {
          if (Object.keys(cartObjs).includes(cartObj.product_id)) {
            cartObjs[cartObj.product_id] += cartObj.quantity;
          } else {
            cartObjs[cartObj.product_id] = cartObj.quantity;
          }
        })
        setCartProducts(cartObjs);
        setProductQuantity(cartObjs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // method to add item to cart
  const addToCart = async (product) => {
    let api_url = `${BASE_URL}/cart/addUserCart`;
    const quantity = getQuantity(product, productQuantity) > 0 ? getQuantity(product, productQuantity) : 1;
    axios.post(api_url, {
      user_id: user_id,
      product_id: product.product_id,
      quantity: quantity,
      price: product.product_price,
      product_name: product.product_name,
      product_image: product.product_image
    })
      .then((response) => {
        setCartProducts({ ...cartProducts, [product.product_id]: quantity });
        setProductQuantity({ ...productQuantity, [product.product_id]: quantity });
      })
      .catch((error) => {
        console.log(error);
      });

  };

  const removeProduct = (product) => {
    CartService.deleteProductFromCart(product, user_id).then(res => {
      setCartProducts({ ...cartProducts, [product.product_id]: undefined });
      setProductQuantity({ ...productQuantity, [product.product_id]: undefined });
    })
  }

  return (
    <>
      <Container className="mt-4 min-height">
        <h1>Shop</h1> <br></br>
        <Grid container spacing={6} align="justify">

          {products.map((product, index) => {
            return (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <Card elevation={5}>
                  <CardMedia
                    component="img"
                    height="175"
                    width="175"
                    image={product.product_image}
                    alt="Farm"
                  />
                  <Typography gutterBottom variant="h6" component="div" className="mt-3 fw-bold">
                    &nbsp;&nbsp; {product.product_name}
                  </Typography>
                  <CardContent className="pt-0">
                    <Typography gutterBottom component="div">
                      {product.product_description}
                    </Typography>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        CAD {product.product_price} / kg
                      </Grid>
                      <Grid item>
                        <label htmlFor="quantity">Quantity:</label>
                        <select
                          name="quantity"
                          id="quantity"
                          onChange={(e) => setProductQuantity({ ...productQuantity, [product.product_id]: e.target.value })}
                          value={getQuantity(product, productQuantity)}
                        >
                          {[...Array(20).keys()].map(val => {
                            return <option key={val}
                              disabled={getQuantity(product, cartProducts) > 0}
                              value={val}
                            >{val}</option>
                          })}
                        </select>
                      </Grid>
                    </Grid>

                  </CardContent>
                  <CardActions className="justify-content-end">
                    {getQuantity(product, cartProducts) > 0
                      ? <div>
                        <Button onClick={() => removeProduct(product)} className="me-2" variant="danger">Remove</Button>
                        <Button disabled variant="success">Added</Button>
                      </div>
                      : <Button
                        variant="outline-success"
                        onClick={addToCart.bind(this, product)}
                      >
                        Add to Cart
                      </Button>}
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </>
  );
}
