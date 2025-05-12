import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";

const apiUrl = "http://localhost:5000";
const userData = JSON.parse(localStorage.getItem("user"));

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${apiUrl}/cart/${userData.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCart(response.data.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      const updatedItems = cart.items.map((item) =>
        item.productId._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );

      const response = await axios.patch(
        `${apiUrl}/cart/${userData.id}/items/${productId}`,
        {
          quantity: newQuantity
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/cart/${cart.userId}/items`,
        {
          data: { productId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span className="text-gray-600 text-lg">Loading your cart...</span>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-gray-600 mb-6">
          Looks like you haven't added anything yet.
        </p>
        <button
          onClick={() => navigate("/customerviewevent")}
          className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition focus:outline-none"
        >
          Browse Events
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Your Shopping Cart
          </h1>
          <p className="text-gray-500 mt-2">Ready to place your order?</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Items */}
          <div className="flex-1 space-y-6">
            {cart.eventId && (
              <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-lg font-medium text-gray-800">
                  Event: {cart.eventId.name}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {cart.eventId.description}
                </p>
              </div>
            )}

            {cart.items.map((item) => (
              <div
                key={item.productId._id}
                className="flex items-center bg-white p-4 rounded-xl shadow gap-4"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden">
                  <img
                    src={
                      item.productId.photoUrl ||
                      "https://via.placeholder.com/150"
                    }
                    alt={item.productId.pname}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="text-xl font-semibold">
                    {item.productId.pname}
                  </h3>
                  <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-400">
                    In stock: {item.productId.stockqut}
                  </p>
                  <div className="flex items-center mt-2 gap-3">
                    <div className="flex items-center rounded-full overflow-hidden border border-gray-300">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.productId._id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 focus:outline-none"
                      >
                        <AiOutlineMinus />
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.productId._id,
                            item.quantity + 1
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 focus:outline-none"
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.productId._id)}
                  className="text-red-500 hover:underline focus:outline-none"
                >
                  <RiDeleteBinLine size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Right Column: Summary */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-8 bg-white rounded-xl shadow p-6 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Order Summary
              </h2>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{cart.cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Advance Payment</span>
                  <span>-₹{cart.advancePayment.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-3">
                  <span>Total Due</span>
                  <span>₹{cart.totalDue.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-red-500 text-white py-3 rounded-full text-lg hover:bg-red-600 transition focus:outline-none"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
