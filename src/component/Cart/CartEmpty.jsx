import React from "react";
import { Link } from "react-router-dom"; // If you're using routing

const CartEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center h-96 text-center">
      {/* Empty Cart Message */}
      <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
      <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>

      {/* Button to Shop */}
      <Link
        to="/"
        className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
      >
        Go Shopping
      </Link>
    </div>
  );
};

export default CartEmpty;
