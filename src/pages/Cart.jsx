// src/pages/CartPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CartItem from "../component/Cart/CartItem";
import CartSummary from "../component/Cart/CartSummary";
import CartEmpty from "../component/Cart/CartEmpty";

const CartPage = () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [cartItems, setCartItems] = useState({
    items: [],
    subtotal: 0,
  });

  const [isSuccess, setIsSuccess] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/product`);
        const allProducts = response.data;

        if (allProducts.length > 0) {
          const selectedProduct = allProducts[0];
          const itemToAdd = {
            id: selectedProduct._id,
            name: selectedProduct.pname,
            price: selectedProduct.pprice,
            quantity: 1,
            photoUrl: selectedProduct.photoUrl,
          };

          setCartItems({
            items: [itemToAdd],
            subtotal: itemToAdd.price,
          });
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cartItems.items.length) {
      setIsSuccess(false);
      setMessage("Your cart is empty.");
      return;
    }

    const payload = {
      items: cartItems.items,
      subtotal: cartItems.subtotal,
    };

    try {
      const response = await axios.post(`${apiUrl}/cart/add`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Server Response:", response.data);
      setIsSuccess(true);
      setMessage("Order placed successfully!");

      setCartItems({
        items: [],
        subtotal: 0,
      });
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error.message);
      setIsSuccess(false);
      setMessage("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {message && (
        <div className={`text-center mb-4 ${isSuccess ? "text-green-600" : "text-red-600"}`}>
          {message}
        </div>
      )}

      {cartItems.items.length === 0 ? (
        <CartEmpty />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="space-y-6">
            <div className="text-right">
              <Link
                to="/"
                className="inline-block px-5 py-2 bg-gray-800 text-white font-medium rounded-md shadow hover:bg-gray-700 transition duration-300"
              >
                ← Continue Shopping
              </Link>
            </div>

            <CartSummary items={cartItems.items} subtotal={cartItems.subtotal} />

            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
