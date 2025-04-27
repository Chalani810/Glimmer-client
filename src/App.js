import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from "./component/Header";
import './index.css';
import AboutUs  from './pages/AboutUs';
import Checkout from "./pages/Checkout"; // Import Checkout
import Footer from "./component/Footer";


function App() {
  return (
    <Router>
      <Header />

      {/* Routing between pages */}
      <Routes>
        {/* Default route - Checkout */}
        <Route path="/" element={<AboutUs />} />

      

        {/* Checkout route */}
        <Route path="/checkout" element={<AboutUs />} />

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
