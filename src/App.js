
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from "./component/Header";
import './index.css';
import AdminEvents from "./pages/AdminEvents";
import AdminAddEvent from './pages/AdminAddEvent';
import AboutUs  from './pages/AboutUs';
import SignUpPage from "./pages/SignUp"; // Import SignUpPage
import Checkout from "./pages/Checkout"; // Import Checkout
import HomePage from "./pages/HomePage"; // Import Home Page
import Footer from "./component/Footer";
import AdminProduct from "./pages/AdminProduct";
import CustomerViewEvent from "./pages/CustomerViewEvent";
<<<<<<< HEAD
import CustomerProduct from "./pages/CustomerProduct";
=======
import Cart from "./pages/Cart"; // Import Cart	
import Invoice from "./pages/Invoice"; // Import Invoice
>>>>>>> 507bf2e885906d4b87c3058650f6da8309c69993

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
      {location.pathname !== '/AdminEvents' && location.pathname !== '/AdminAddEvent' && location.pathname !== '/AdminProduct' && location.pathname !== '/AdminProduct'&& <Header />}
      

      {/* Routing between pages */}
      <Routes>
        {/* Default route - Checkout */}

        <Route path="/adminevents" element={<AdminEvents />} />

        <Route path="/adminaddevent" element={<AdminAddEvent />} />

        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/adminproduct" element={<AdminProduct />} />
        <Route path="/customerviewevent" element={<CustomerViewEvent />} />
        <Route path="/customerproduct" element={<CustomerProduct />} />

        {/* Cart route */}
        <Route path="/cart" element={<Cart />} />

        <Route path="/invoice" element={<Invoice />} />
          <Route path="/" element={<AboutUs />} />
            <Route path="/checkout" element={<AboutUs />} />
               {/* Home Page route */}
        <Route path="/home" element={<HomePage />} />

        {/* Sign Up page route */}
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>

<<<<<<< HEAD
      {location.pathname !== '/AdminEvents' && location.pathname !== '/AdminAddEvent' &&  location.pathname !== '/AdminProduct' && <Footer />}
=======
      {location.pathname !== '/AdminEvents' && location.pathname !== '/AdminAddEvent' && <Footer />}
>>>>>>> 507bf2e885906d4b87c3058650f6da8309c69993
      
    </>
  );
}


export default App;
