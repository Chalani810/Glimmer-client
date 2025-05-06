import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import "./index.css";
import SignUpPage from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import EmployeeManagement from "./pages/EmployeeManagement";
import React from 'react';
import ContactUs from './pages/ContactUs';
import Checkout from "./pages/Checkout";
import AdminEvents from "./pages/AdminEvents";
import AdminAddEvent from "./pages/AdminAddEvent";
import AboutUs from "./pages/AboutUs";
import Footer from "./component/Footer";
import Cart from "./pages/Cart";
import Invoice from "./pages/Invoice";
import AdminBills from "./pages/AdminBills"; // Import AdminBills
import OrderSummary from "./pages/OrderSummary";
import { CartProvider } from "./CartContext";
import OrderSummary  from "./pages/OrderSummary";
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <CartProvider>
      <AppWithRoutes />
      </CartProvider>
    </Router>
  );
}

function AppWithRoutes() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/admin-bills" &&
        location.pathname !== "/AdminAddEvent" &&
      location.pathname !== "/AdminEvents" &&
        location.pathname !=="/EmployeeManagement" && <Header />}
      <Routes>
        <Route path="/AdminEvents" element={<AdminEvents />} />
        <Route path="/adminaddevent" element={<AdminAddEvent />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/" element={<AboutUs />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/employeeManagement" element={<EmployeeManagement />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/ordersummary" element={<OrderSummary />} />
        <Route path="/admin-bills" element={<AdminBills />} />
      </Routes>

{location.pathname !== "/admin-bills" &&
      location.pathname !== "/AdminEvents" &&
        location.pathname !== "/AdminAddEvent" &&
        location.pathname !== "/employeeManagement" && 
        location.pathname !== "/dashboard" && <Footer />}
    </>


  );
}

export default App;
