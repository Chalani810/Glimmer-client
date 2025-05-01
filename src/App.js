
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from "./component/Header";
import './index.css';
import AdminEvents from "./pages/AdminEvents";
import AdminAddEvent from './pages/AdminAddEvent';
import AboutUs  from './pages/AboutUs';
import SignUpPage from "./pages/SignUp"; // Import SignUpPage
import LoginPage from "./pages/SignInPage"; //Import LoginPage
import Checkout from "./pages/Checkout"; // Import Checkout
import HomePage from "./pages/HomePage"; // Import Home Page
import FeedbackPage from "./pages/FeedbackPage"; // Import Feedback Page
import ProfilePage from "./pages/CustomerProfilePage"; // Import Customer Profile Page
import Footer from "./component/Footer";
import AdminProduct from "./pages/AdminProduct";
import CustomerViewEvent from "./pages/CustomerViewEvent";
import Cart from "./pages/Cart"; // Import Cart	
import Invoice from "./pages/Invoice"; // Import Invoice

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
      {location.pathname !== '/adminevents' && location.pathname !== '/adminaddevent' && <Header />}
      

      {/* Routing between pages */}
      <Routes>
        {/* Default route - Checkout */}

        <Route path="/adminevents" element={<AdminEvents />} />

        <Route path="/adminaddevent" element={<AdminAddEvent />} />

        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/adminproduct" element={<AdminProduct />} />
        <Route path="/customerviewevent" element={<CustomerViewEvent />} />

        {/* Cart route */}
        <Route path="/cart" element={<Cart />} />

        <Route path="/invoice" element={<Invoice />} />
          <Route path="/" element={<AboutUs />} />
            <Route path="/checkout" element={<AboutUs />} />
               {/* Home Page route */}
        <Route path="/home" element={<HomePage />} />

        {/* Sign Up page route */}
        <Route path="/signup" element={<SignUpPage />} />
        
        {/* Sign In page route */}
        <Route path="/signin" element={<LoginPage />} />

        {/* Customer Profile page route */}
        <Route path="/customerprofile" element={<ProfilePage />} />

        {/* Customer Feedback page route */}
        <Route path="/feedback" element={<FeedbackPage />} />

      </Routes>

      {location.pathname !== '/AdminEvents' && location.pathname !== '/AdminAddEvent' && <Footer />}
      
    </>
  );
}


export default App;
