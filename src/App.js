import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import './index.css';

// Global components
import Header from "./component/Header";
import Footer from "./component/Footer";

// Admin components
import AdminEvents from "./pages/AdminEvents";
import AdminAddEvent from './pages/AdminAddEvent';
import AdminProduct from "./pages/AdminProduct";
import AdminBills from './pages/AdminBills';
import AdminNavbar from './component/AdminEvent/Navbar';

// Customer Management Components
import CustomerMgtPage from "./pages/CustomerMgtPage";
import CustomerTable from './component/CustomerMgt/CustomerTable';

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
import OrderHistory from "./pages/OrderHistory";
import CustomerViewEvent from "./pages/CustomerViewEvent";
import CustomerProduct from "./pages/CustomerProduct";
import EmployeeManagement from "./pages/EmployeeManagement";
import Dashboard from './pages/Dashboard';

import { CartProvider } from './CartContext';


function App() {
  return (
   
    <Router>
       <CartProvider>
        <AppWithRoutes />
    </Router>
    
  );
}

function AppWithRoutes() {
  const location = useLocation();
  const isEventAdminPage = location.pathname.startsWith('/admin');
  const isCustomerAdminPage = location.pathname === '/customers';

  // Detect admin context for clean layout control
  const isEventAdminPage = location.pathname === '/adminevents' || location.pathname === '/adminaddevent';
  const isCustomerAdminPage = location.pathname === '/customers';

  return (
    <>
      {location.pathname !== '/AdminEvents' && 
      location.pathname !== '/AdminAddEvent' && 
      location.pathname !== '/AdminProduct' && 
      location.pathname !== '/AdminProduct'&& 
      location.pathname !== '/EmployeeManagement'&&
    !isEventAdminPage && !isCustomerAdminPage &&
      <Header />}

      {/* Admin-specific Navbars */}
      {isEventAdminPage && <AdminNavbar />}

      <Routes>
        {/* Admin Event Routes */}
        <Route path="/adminevents" element={<AdminEvents />} />
        <Route path="/adminaddevent" element={<AdminAddEvent />} />
        <Route path="/adminproduct" element={<AdminProduct />} />
        <Route path="/customerviewevent" element={<CustomerViewEvent />} />
        <Route path="/customerproduct" element={<CustomerProduct />} />
        <Route path="/employeeManagement" element={<EmployeeManagement />} />
        <Route path="/contactUs" element={<ContactUs />} />
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
        <Route path="/customerprofile" element={<ProfilePage />} />
        <Route path="/feedback" element={<FeedbackListPage />} />
          <Route path="/" element={<AboutUs />} />
        <Route path="/home" element={<HomePage />} />

        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/customerprofile" element={<ProfilePage />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/orderhistory" element={<OrderHistory />} />

        {/* Admin Routes */}
        <Route path="/adminevents" element={<AdminEvents />} />
        <Route path="/adminaddevent" element={<AdminAddEvent />} />
        <Route path="/customers" element={<CustomerMgtPage />} />
        <Route path="/admin-bills" element={<AdminBills />} />
        <Route path="/employeeManagement" element={<EmployeeManagement />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>

      {location.pathname !== '/AdminEvents' && 
      location.pathname !== '/AdminAddEvent' &&  
      location.pathname !== '/AdminProduct' &&
      location.pathname !== '/EmployeeManagement' && 
        !isEventAdminPage && !isCustomerAdminPage &&
      <Footer />}
    </>
  );
}
export default App;
