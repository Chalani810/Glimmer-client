
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
import Checkout from "./pages/Checkout"; // Import Checkout
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
      </Routes>

      {location.pathname !== '/AdminEvents' && location.pathname !== '/AdminAddEvent' && <Footer />}
    </>
  );
}

export default App;
