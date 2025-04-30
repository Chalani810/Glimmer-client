import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from "./component/Header";
import './index.css';
import Checkout from "./pages/Checkout";
import AdminEvents from "./pages/AdminEvents";
import AdminAddEvent from './pages/AdminAddEvent';
import Footer from "./component/Footer";
import AdminProduct from "./pages/AdminProduct";
import CustomerViewEvent from "./pages/CustomerViewEvent";

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
      

      <Routes>
        <Route path="/" element={<Checkout />} />

        <Route path="/adminevents" element={<AdminEvents />} />

        <Route path="/adminaddevent" element={<AdminAddEvent />} />

        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/adminproduct" element={<AdminProduct />} />
        <Route path="/customerviewevent" element={<CustomerViewEvent />} />

      </Routes>

      {location.pathname !== '/adminevents' && location.pathname !== '/adminaddevent' && <Footer />}
      
    </>
  );
}

export default App;
