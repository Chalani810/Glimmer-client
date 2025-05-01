import React from "react";
import { Link } from 'react-router-dom';

// src/component/Cart/CartSummary.jsx


const CartSummary = ({ items, subtotal }) => {
  return (
    <div className="p-6 border rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

      {/* Table Header */}
      <div className="grid grid-cols-3 font-semibold text-gray-700 mb-4">
        <span>Item</span>
        <span className="text-center">Quantity</span>
        <span className="text-right">Price</span>
      </div>

      {/* Items */}
      <div className="space-y-2 mb-6">
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-3 text-gray-700">
            <span>{item.name}</span>
            <span className="text-center">{item.quantity}</span>
            <span className="text-right">Rs.{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <hr className="my-4" />

      {/* Subtotal */}
      <div className="flex justify-between font-semibold text-lg">
        <span>Subtotal:</span>
        <span>Rs.{subtotal}</span>
      </div>

      {/* Total */}
      <div className="flex justify-between font-bold text-xl mt-4">
        <span>Total:</span>
        <span>Rs.{subtotal}</span>
      </div>

      <Link
        to="/checkout"
         className="inline-block mt-6 px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition duration-300 "
      >
         Proceed to Checkout
      </Link>
    </div>
  );
};

export default CartSummary;
