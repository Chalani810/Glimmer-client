import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import "./App.css";
import Header from "./component/Header";
import "./index.css";
import SignUpPage from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import EmployeeManagement from "./pages/EmployeeManagement";
import React from "react";
import ContactUs from "./pages/ContactUs";
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
import Dashboard from "./pages/Dashboard";
import SalaryView from "./pages/EmployeePayroll";

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
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#fff",
            color: "#363636",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#4BB543",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#FF3333",
              secondary: "#fff",
            },
          },
          loading: {
            duration: 5000,
          },
        }}
      />
      {location.pathname !== "/admin-bills" &&
        location.pathname !== "/AdminAddEvent" &&
        location.pathname !== "/employee-payroll" &&
        location.pathname !== "/AdminEvents" &&
        location.pathname !== "/EmployeeManagement" && <Header />}
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
        <Route path="/employee-payroll" element={<SalaryView />} />
      </Routes>

      {location.pathname !== "/admin-bills" &&
        location.pathname !== "/AdminEvents" &&
        location.pathname !== "/AdminAddEvent" &&
        location.pathname !== "/employeeManagement" &&
        location.pathname !== "/employee-payroll" &&
        location.pathname !== "/dashboard" && <Footer />}
    </>
  );
}

export default App;
