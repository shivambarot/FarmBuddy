import MainNavbar from "./mainNavbar";
import {Nav} from "react-bootstrap";
import {Power} from 'react-bootstrap-icons';
import {useNavigate} from "react-router-dom";
import AppConfig from "../../../appConfig";

const FarmerNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(AppConfig.USER_ID_KEY)
    localStorage.removeItem(AppConfig.USER_TYPE_KEY)
    localStorage.removeItem(AppConfig.USER_TOKEN)
    navigate("/login")
  }
  return (
    <MainNavbar>
      <Nav.Link className="d-flex align-items-center" onClick={handleLogout}>
        <Power size="24" color="white"/>
        <span className="hide">Logout</span>
      </Nav.Link>
    </MainNavbar>
  )
}


export default FarmerNavbar;