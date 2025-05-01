
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from "./component/Header";
import './index.css';
import Checkout from "./pages/Checkout";
import AdminEvents from "./pages/AdminEvents";
import AdminAddEvent from './pages/AdminAddEvent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from "./component/Header";
import './index.css';
import AboutUs  from './pages/AboutUs';
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

        {/* Checkout route */}
        <Route path="/checkout" element={<Checkout />} />

        {/* Invoice route  */}
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/checkout" element={<AboutUs />} />
          
      </Routes>

      {location.pathname !== '/AdminEvents' && location.pathname !== '/AdminAddEvent' && <Footer />}
      
    </>
  );
}

export default App;
