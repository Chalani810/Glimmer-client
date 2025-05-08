import React from "react";

const CartItem = ({ item, onRemove }) => {
  // Calculate total price for the item based on quantity
  const totalPrice = item.price * item.quantity;

  return (
    <div className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow">
      {/* Item Image */}
      <div className="flex items-center space-x-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-md"
        />
        
        {/* Item Details */}
        <div>
          <h2 className="text-lg font-semibold">{item.name}</h2>
          <p className="text-gray-500">Qty: {item.quantity}</p>
          <p className="text-gray-700 font-bold">Rs {item.price}</p>
          {/* Total Price */}
          <p className="text-sm text-gray-600">Total: Rs {totalPrice}</p>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.id)}
        className="text-red-500 hover:text-red-700 font-semibold focus:outline-none"
        aria-label={`Remove ${item.name} from cart`}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
