import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import AddProduct from './components/pages/auth/AddProduct';
import Shop from './components/pages/dashboard/user/Shop';
import Cart from './components/pages/dashboard/user/cart/Cart';
import Farmer from "./components/pages/dashboard/Farmer";
import Checkout from "./components/pages/dashboard/user/checkout/Checkout";
import AboutUs from "./components/pages/about";
import CustomerRoute from "./components/common/routing/CustomerRoute";
import Footer from "./components/common/Footer";
import EditProduct from './components/pages/auth/EditProduct';

function App() {
  return (
    <div className="App d-flex flex-column">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/customer" element={<CustomerRoute />}>
            <Route path="dashboard" element={<Shop />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>
          <Route path="/farmer">
            <Route path="dashboard" element={<Farmer />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="edit-product" element={<EditProduct />} />
          </Route>
          <Route path="*" element={<h1>404 Not found</h1>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
