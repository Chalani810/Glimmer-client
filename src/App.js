import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import "./index.css";
import AdminEvents from "./pages/AdminEvents";
import AdminAddEvent from "./pages/AdminAddEvent";
import AboutUs from "./pages/AboutUs";
import SignUpPage from "./pages/SignUp"; // Import SignUpPage
import Checkout from "./pages/Checkout"; // Import Checkout
import HomePage from "./pages/HomePage"; // Import Home Page
import Footer from "./component/Footer";
import Cart from "./pages/Cart"; // Import Cart
import Invoice from "./pages/Invoice"; // Import Invoice
import EmployeeManagement from "./pages/EmployeeManagement";
import React from 'react';
import ContactUs from './pages/ContactUs';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <AppWithRoutes />
    </Router>
  );
}



function AppWithRoutes() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/AdminEvents" &&
        location.pathname !== "/AdminAddEvent" && 
        location.pathname !=="/EmployeeManagement" && <Header />}

      {/* Routing between pages */}
      <Routes>
        <Route path="/AdminEvents" element={<AdminEvents />} />

        <Route path="/adminaddevent" element={<AdminAddEvent />} />

        <Route path="/Checkout" element={<Checkout />} />

        {/* Cart route */}
        <Route path="/cart" element={<Cart />} />

        {/* Invoice route  */}
        <Route path="/invoice" element={<Invoice />} />

        <Route path="/" element={<AboutUs />} />
        <Route path="/home" element={<HomePage />} />

        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/" element={<AboutUs />} />
        <Route path="/employeeManagement" element={<EmployeeManagement />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/AboutUs" element={<AboutUs />} />

        <Route path="/contactUs" element={<ContactUs />} />
      </Routes>
      {/*
      {location.pathname !== "/AdminEvents" &&
        location.pathname !== "/AdminAddEvent" &&
        location.pathname !== "/employeeManagement" && <Footer />*/}
    

      {location.pathname !== "/AdminEvents" &&
        location.pathname !== "/AdminAddEvent" && 
        location.pathname !== "/dashboard" && <Footer />}
    </>


  );
}

export default App;
