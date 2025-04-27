import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from "./component/Header";
import './index.css';
import Cart from "./pages/Cart"; // Import Cart	
import Invoice from "./pages/Invoice"; // Import Invoice
import Checkout from "./pages/Checkout"; // Import Checkout
import Footer from "./component/Footer";



function App() {
  return (
    <Router>
      <Header />

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


        {/* 404 Not Found route */}

        
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
