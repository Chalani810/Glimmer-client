import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import './index.css';

// Global components
import Header from "./component/Header";
import Footer from "./component/Footer";

// Admin components
import AdminEvents from "./pages/AdminEvents";
import AdminAddEvent from './pages/AdminAddEvent';
import AdminNavbar from './component/AdminEvent/Navbar';
import CustomerMgtPage from "./pages/CustomerMgtPage";

// Public pages
import AboutUs from './pages/AboutUs';
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/SignInPage";
import Checkout from "./pages/Checkout";
import HomePage from "./pages/HomePage";
import FeedbackPage from "./pages/FeedbackPage";
import ProfilePage from "./pages/CustomerProfilePage";
import Cart from "./pages/Cart";
import Invoice from "./pages/Invoice";
import ContactUs from './pages/ContactUs';
import EmployeeManagement from "./pages/EmployeeManagement";
import Dashboard from './pages/Dashboard';
import AdminBills from './pages/AdminBills';
import OrderHistory from "./pages/OrderHistory";
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
  const isEventAdminPage = location.pathname.startsWith('/admin');
  const isCustomerAdminPage = location.pathname === '/customers';

  return (
    <>
      {/* Show global Header only for public pages */}
      {!isEventAdminPage && !isCustomerAdminPage && <Header />}

      {/* Admin-specific Navbars */}
      {isEventAdminPage && <AdminNavbar />}

      <Routes>
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

      {/* Show global Footer only for public pages */}
      {!isEventAdminPage && !isCustomerAdminPage && <Footer />}
    </>
  );
}

export default App;