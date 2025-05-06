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
      {/* Hide Header for AdminBills page */}
      {location.pathname !== "/admin-bills" &&
        location.pathname !== "/AdminEvents" &&
        location.pathname !== "/AdminAddEvent" && <Header />}

      {/* Routing between pages */}
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
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/AdminEvents" element={<AdminEvents />} />
        <Route path="/AdminAddEvent" element={<AdminAddEvent />} />
        <Route path="/checkout" element={<AboutUs />} />
        <Route path="/ordersummary" element={<OrderSummary />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/admin-bills" element={<AdminBills />} />
      </Routes>

      {/* Hide Footer for AdminBills page */}
      {location.pathname !== "/admin-bills" &&
        location.pathname !== "/AdminEvents" &&
        location.pathname !== "/AdminAddEvent" &&
        location.pathname !== "/employeeManagement" && <Footer />}
    </>
  );
}

export default App;
