// src/pages/CartPage.jsx
import React from "react";
import { Link } from "react-router-dom"; // Import Link
import CartItem from "../component/Cart/CartItem";
import CartSummary from "../component/Cart/CartSummary";
import CartEmpty from "../component/Cart/CartEmpty";

// Dummy data (Later this should come from a backend or context/store)
const cartItems = [
  {
    id: 1,
    name: "Luxury Chair",
    price: 2500,
    quantity: 2,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Event Table",
    price: 4000,
    quantity: 1,
    image: "https://via.placeholder.com/150",
  },
];

const CartPage = () => {
  // Calculation logic
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {/* Check if cart is empty */}
      {cartItems.length === 0 ? (
        <CartEmpty /> // Show Empty Cart UI
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side - Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Right side - Order Summary */}
          <div className="space-y-6">
            {/* Continue Shopping Button */}
            <div className="text-right">
              <Link
                to="/"
                className="inline-block px-5 py-2 bg-gray-800 text-white font-medium rounded-md shadow hover:bg-gray-700 transition duration-300"
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* Cart Summary */}
            <CartSummary items={cartItems} subtotal={subtotal} />

          </div> {/* Close Right Side */}
        </div> /* Close Grid */
      )}
    </div> /* Close Main Container */
  );
};

export default CartPage;
