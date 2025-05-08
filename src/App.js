
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import './index.css';

// Global components
import Header from "./component/Header";
import Footer from "./component/Footer";

// Admin Event Components
import AdminEvents from "./pages/AdminEvents";
import AdminAddEvent from './pages/AdminAddEvent';
import AdminNavbar from './component/AdminEvent/Navbar';

// Customer Management Components
import CustomerMgtPage from "./pages/CustomerMgtPage";
import CustomerTable from './component/CustomerMgt/CustomerTable';

// General Pages
import AboutUs from './pages/AboutUs';
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/SignInPage";
import Checkout from "./pages/Checkout";
import HomePage from "./pages/HomePage";
import FeedbackPage from "./pages/FeedbackPage";
import ProfilePage from "./pages/CustomerProfilePage";
import Cart from "./pages/Cart";
import Invoice from "./pages/Invoice";

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

  // Detect admin context for clean layout control
  const isEventAdminPage = location.pathname === '/adminevents' || location.pathname === '/adminaddevent';
  const isCustomerAdminPage = location.pathname === '/customers';

  return (
    <>

      {/* Show global Header only for public pages */}
      {!isEventAdminPage && !isCustomerAdminPage && <Header />}

      {/* Admin-specific Navbars */}
      {isEventAdminPage && <AdminNavbar />}

      <Routes>
        {/* Admin Event Routes */}
        <Route path="/adminevents" element={<AdminEvents />} />
        <Route path="/adminaddevent" element={<AdminAddEvent />} />

        {/* Admin Customer Management Route */}
        <Route path="/customers" element={<CustomerMgtPage />} />

        {/* Public Routes */}
        <Route path="/" element={<AboutUs />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/customerprofile" element={<ProfilePage />} />
      </Routes>

      {/* Show global Footer only for public pages */}
      {!isEventAdminPage && !isCustomerAdminPage && <Footer />}

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
