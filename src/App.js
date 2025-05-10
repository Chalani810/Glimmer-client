import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import './index.css';

// Global components
import Header from "./component/Header";
import Footer from "./component/Footer";
import AdminNavbar from './component/AdminEvent/Navbar';

// Admin components
import AdminEvents from "./pages/AdminEvents";
import AdminAddEvent from './pages/AdminAddEvent';
import AdminProduct from "./pages/AdminProduct";
import AdminBills from './pages/AdminBills';

// Customer Management Components
import CustomerMgtPage from "./pages/CustomerMgtPage";
import CustomerTable from './component/CustomerMgt/CustomerTable';

// Employee Management
import EmployeeManagement from "./pages/EmployeeManagement";
import Dashboard from './pages/Dashboard';
import SalaryView from "./pages/EmployeePayroll";

// Public pages
import AboutUs from './pages/AboutUs';
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import ContactUs from "./pages/ContactUs";
import Checkout from "./pages/Checkout";
import FeedbackPage from "./pages/FeedbackPage";
import FeedbackListPage from "./pages/FeedbackListPage";
import ProfilePage from "./pages/CustomerProfilePage";
import Cart from "./pages/Cart";
import Invoice from "./pages/Invoice";
import OrderSummary from "./pages/OrderSummary";
import OrderHistory from "./pages/OrderHistory";
import CustomerViewEvent from "./pages/CustomerViewEvent";
import CustomerProduct from "./pages/CustomerProduct";

import { CartProvider } from './CartContext';


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
  const isEventAdminPage = location.pathname === '/adminevents' || location.pathname === '/adminaddevent';
  const isCustomerAdminPage = location.pathname === '/customers';

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
      {location.pathname !== '/AdminEvents' && 
      location.pathname !== '/AdminAddEvent' && 
      location.pathname !== '/AdminProduct' && 
      location.pathname !== '/AdminProduct'&& 
      location.pathname !== '/EmployeeManagement'&&
      location.pathname !== '/admin-bills'&&
        location.pathname !== "/employee-payroll" &&
        location.pathname !== "/EmployeeManagement" &&
    !isEventAdminPage && !isCustomerAdminPage &&
      <Header />}

      <Routes>
        <Route path="/adminevents" element={<AdminEvents />} />
        <Route path="/adminaddevent" element={<AdminAddEvent />} />
        <Route path="/adminproduct" element={<AdminProduct />} />
        <Route path="/customerviewevent" element={<CustomerViewEvent />} />
        <Route path="/customerproduct" element={<CustomerProduct />} />
        <Route path="/employeeManagement" element={<EmployeeManagement />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/customers" element={<CustomerMgtPage />} />

        <Route path="/" element={<AboutUs />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/customerprofile" element={<ProfilePage />} />
          
        <Route path="/AdminEvents" element={<AdminEvents />} />
        <Route path="/adminaddevent" element={<AdminAddEvent />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/feedback" element={<FeedbackListPage />} />

        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/orderhistory" element={<OrderHistory />} />

        <Route path="/admin-bills" element={<AdminBills />} />
        <Route path="/employee-payroll" element={<SalaryView />} />
        <Route path="/dashboard" element={<Dashboard />} />
          
      {location.pathname !== "/admin-bills" &&
        location.pathname !== "/AdminEvents" &&
        location.pathname !== "/AdminAddEvent" &&
       location.pathname !== '/AdminProduct' &&
        location.pathname !== "/employeeManagement" &&
        location.pathname !== "/employee-payroll" &&
        location.pathname !== "/dashboard" && 
       !isEventAdminPage && !isCustomerAdminPage &&<Footer />}

      </Routes>
    </>

  );
}
export default App;
