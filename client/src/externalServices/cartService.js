import AppConfig from "../appConfig";
import axios from "axios";

const BASE_URL = AppConfig.BASE_URL;

const CartService = {
  deleteProductFromCart: (product, user_id) => {
    let api_url = `${BASE_URL}/cart/${product.product_id}`;
    return axios.delete(api_url, {
      headers: {
        user_id: user_id
      }
    })
  }
}

export default CartService;