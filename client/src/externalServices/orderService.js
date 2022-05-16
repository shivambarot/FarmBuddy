import AppConfig from "../appConfig";
import axios from "axios";

const BASE_URL = `${AppConfig.BASE_URL}/order`;

const OrderService = {
  processOrder: (user_id) => {
    let api_url = `${BASE_URL}/addOrder`;
    const commissionPercentage = 10;
    const taxPercentage = 0;
    return axios.post(api_url, {
      user_id: user_id,
      commission_percentage: commissionPercentage,
      tax_percentage: taxPercentage
    })
  }
}

export default OrderService;