import AppConfig from "../../../appConfig";
import {Navigate, Outlet} from "react-router-dom";

const CustomerRoute = () => {
  const userID = localStorage.getItem(AppConfig.USER_ID_KEY)
  console.log(userID)
  return userID === null ? <Navigate to="/login"/> : <Outlet/>
}

export default CustomerRoute;