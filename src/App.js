
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
      {location.pathname !== '/AdminEvents' && location.pathname !== '/AdminAddEvent' && <Header />}

      <Routes>
        <Route path="/" element={<Checkout />} />

        <Route path="/AdminEvents" element={<AdminEvents />} />

        <Route path="/AdminAddEvent" element={<AdminAddEvent />} />

        <Route path="/Checkout" element={<Checkout />} />
          <Route path="/" element={<AboutUs />} />
            <Route path="/checkout" element={<AboutUs />} />
               {/* Home Page route */}
        <Route path="/home" element={<HomePage />} />

        {/* Default route - Checkout */}
        <Route path="/checkout" element={<Checkout />} />

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
