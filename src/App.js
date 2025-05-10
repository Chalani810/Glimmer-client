import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import './index.css';
import Header from "./component/Header";
import AdminEvents from "./pages/AdminEvents";
import AdminAddEvent from './pages/AdminAddEvent';
import AboutUs  from './pages/AboutUs';
import SignUpPage from "./pages/SignUp"; // Import SignUpPage
import Checkout from "./pages/Checkout"; // Import Checkout
import HomePage from "./pages/HomePage"; // Import Home Page
import Footer from "./component/Footer";

// Admin Event Components
import AdminNavbar from './component/AdminEvent/Navbar';

// Customer Management Components
import CustomerMgtPage from "./pages/CustomerMgtPage";
import CustomerTable from './component/CustomerMgt/CustomerTable';

// General Pages
import LoginPage from "./pages/SignInPage";
import ProfilePage from "./pages/CustomerProfilePage";
import Cart from "./pages/Cart";
import Invoice from "./pages/Invoice";
import FeedbackListPage from "./pages/FeedbackListPage";


function App() {
  return (
    <Router>
      <AppWithRoutes />
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
        <Route path="/customerprofile" element={<ProfilePage />} />
        <Route path="/feedback" element={<FeedbackListPage />} />
          <Route path="/" element={<AboutUs />} />
        <Route path="/home" element={<HomePage />} />

        <Route path="/signup" element={<SignUpPage />} />
      </Routes>

      {/* Show global Footer only for public pages */}
      {!isEventAdminPage && !isCustomerAdminPage && <Footer />}
    </>
  );
}
export default App;
