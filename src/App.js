
import './App.css';
import Header from "./component/Header";
import './index.css';
import Checkout from "./pages/Checkout"; // Import Checkout
import Footer from "./component/Footer";



function App() {
  return (
    <div>
     <Header />
    
      {/* Render the CheckoutForm component */}
      <Checkout/>
      <Footer/>
    </div>
  );
}

export default App;
