
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
    <Router>
      {location.pathname !== '/AdminEvents' && location.pathname !== '/AdminAddEvent' && <Header />}
      

      {/* Routing between pages */}
      <Routes>
        {/* Default route - Checkout */}
        <Route path="/" element={<Checkout />} />

        {/* Cart route */}
        <Route path="/cart" element={<Cart />} />

        {/* Checkout route */}
        <Route path="/checkout" element={<Checkout />} />

        {/* Invoice route  */}
        <Route path="/invoice" element={<Invoice />} />

        <Route path="/AdminEvents" element={<AdminEvents />} />
        <Route path="/AdminAddEvent" element={<AdminAddEvent />} />
          
            <Route path="/checkout" element={<AboutUs />} />
          
          
        {/* 404 Not Found route */}

        
      </Routes>

      {location.pathname !== '/AdminEvents' && location.pathname !== '/AdminAddEvent' && <Footer />}
      
    </Router>
    <>
  );
}

export default App;
