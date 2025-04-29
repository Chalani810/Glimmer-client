
import './App.css';
import Header from "./component/Header";
import './index.css';
import SignUpPage from "./pages/SignUp"; // Import SignUpPage
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./pages/Checkout"; // Import Checkout
import HomePage from "./pages/HomePage"; // Import Home Page
import Footer from "./component/Footer";

function App() {
  return (
    <Router>
      <Header />

      {/* Routing between pages */}
      <Routes>

        {/* Home Page route */}
        <Route path="/home" element={<HomePage />} />

        {/* Default route - Checkout */}
        <Route path="/checkout" element={<Checkout />} />

        {/* Sign Up page route */}
        <Route path="/signup" element={<SignUpPage />} />
        
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;