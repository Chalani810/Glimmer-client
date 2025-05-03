import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import "./index.css";
import SignUpPage from "./pages/SignUp"; // Import SignUpPage
import HomePage from "./pages/HomePage"; // Import Home Page
import EmployeeManagement from "./pages/EmployeeManagement";
import React from 'react';
import ContactUs from './pages/ContactUs';
import Checkout from "./pages/Checkout";
import AdminEvents from "./pages/AdminEvents";
import AdminAddEvent from "./pages/AdminAddEvent";
import AboutUs from "./pages/AboutUs";
import Footer from "./component/Footer";
import Cart from "./pages/Cart"; // Import Cart
import Invoice from "./pages/Invoice"; // Import Invoice
import AdminBills from "./pages/AdminBills"; // Import AdminBills
import OrderSummary  from "./pages/OrderSummary";
//import Footer from "./component/Footer";


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
        location.pathname !== "/AdminAddEvent" && <Header />}

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

        <Route path="/employeeManagement" element={<EmployeeManagement />} />

        <Route path="/contactUs" element={<ContactUs />} />

        <Route path="/AdminEvents" element={<AdminEvents />} />
        <Route path="/AdminAddEvent" element={<AdminAddEvent />} />

        <Route path="/checkout" element={<AboutUs />} />
        <Route path="/ordersummary" element={<OrderSummary />} />

        <Route path="/admin-bills" element={<AdminBills />} />
          
      </Routes>

      {location.pathname !== "/AdminEvents" &&
        location.pathname !== "/AdminAddEvent" &&
        location.pathname !== "/employeeManagement" && <Footer />}
    </>
  );
}

export default App;
