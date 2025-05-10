
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from "./component/Header";
import './index.css';
import AdminEvents from "./pages/AdminEvents";
import AdminAddEvent from './pages/AdminAddEvent';
import AboutUs  from './pages/AboutUs';
import SignUpPage from "./pages/SignUp"; // Import SignUpPage
import HomePage from "./pages/HomePage"; // Import Home Page
import Footer from "./component/Footer";
import AdminProduct from "./pages/AdminProduct";
import CustomerViewEvent from "./pages/CustomerViewEvent";
import CustomerProduct from "./pages/CustomerProduct";
import EmployeeManagement from "./pages/EmployeeManagement";
import ContactUs from "./pages/ContactUs";


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
      {location.pathname !== '/AdminEvents' && 
      location.pathname !== '/AdminAddEvent' && 
      location.pathname !== '/AdminProduct' && 
      location.pathname !== '/AdminProduct'&& 
      location.pathname !== '/EmployeeManagement'&& 
      <Header />}
      

      {/* Routing between pages */}
      <Routes>
        {/* Default route - Checkout */}

        <Route path="/adminevents" element={<AdminEvents />} />
        <Route path="/adminaddevent" element={<AdminAddEvent />} />
        <Route path="/adminproduct" element={<AdminProduct />} />
        <Route path="/customerviewevent" element={<CustomerViewEvent />} />
        <Route path="/customerproduct" element={<CustomerProduct />} />
        <Route path="/employeeManagement" element={<EmployeeManagement />} />
        <Route path="/contactUs" element={<ContactUs />} />

        {/* Cart route */}
        

        
          <Route path="/" element={<AboutUs />} />
            <Route path="/checkout" element={<AboutUs />} />
               {/* Home Page route */}
        <Route path="/home" element={<HomePage />} />

        {/* Sign Up page route */}
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>


      {location.pathname !== '/AdminEvents' && 
      location.pathname !== '/AdminAddEvent' &&  
      location.pathname !== '/AdminProduct' &&
      location.pathname !== '/EmployeeManagement' && 
      <Footer />}

      

      
    </>
  );
}


export default App;
