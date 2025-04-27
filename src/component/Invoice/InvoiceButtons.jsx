import React from "react";

const InvoiceButtons = () => {
  return (
    <div className="text-sm mb-6">
      {/* Subtotal */}
      <div className="flex justify-between py-1">
        <p className="text-gray-500">Sub total</p>
        <p className="font-medium">LKR 550,000</p>
      </div>

      {/* Discount */}
      <div className="flex justify-between py-1">
        <p className="text-gray-500">Discount - 10%</p>
        <p className="font-medium text-green-500">- LKR 55,000</p>
      </div>

      {/* Total */}
      <div className="flex justify-between border-t pt-2 mt-2">
        <p className="text-gray-500">Total</p>
        <p className="font-medium">LKR 495,000</p>
      </div>

      {/* Amount Due */}
      <div className="flex justify-between border-t pt-2 mt-2 text-lg font-semibold">
        <p className="text-gray-700">Amount due</p>
        <p className="text-gray-900">LKR 495,000</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button className="border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-100">
          Cancel
        </button>
        <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700">
          Continue
        </button>
      </div>
    </div>
  );
};

export default InvoiceButtons;
