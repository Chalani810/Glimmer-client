
import './App.css';
import Header from "./component/Header";
import './index.css';
import AboutUs  from './pages/AboutUs';
import Checkout from "./pages/Checkout"; // Import Checkout
import Footer from "./component/Footer";



function App() {
  return (
    <div>
     <Header />
    <AboutUs/>
      {/* Render the CheckoutForm component */}
      <Checkout/>
      <Footer/>
    </div>
  );
}

export default App;
