import AppConfig from "../appConfig";
import axios from "axios";

const BASE_URL = `${AppConfig.BASE_URL}/user`
const UserService = {
  register: (data) => {
    const url = `${BASE_URL}/register`;
    return axios.post(url, data);
  },
  login: (data) => {
    const url = `${BASE_URL}/login`;
    return axios.post(url, data);
  }
}

export default UserService;