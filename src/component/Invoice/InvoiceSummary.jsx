import React from "react";

const InvoiceSummary = () => {
  return (
    <div className="grid grid-cols-2 gap-4 text-sm mb-6">
      <div>
        <p className="text-gray-500">Your Order</p>
        <p className="font-medium">RV2386 - 08-097</p>
      </div>
      <div>
        <p className="text-gray-500">Date</p>
        <p className="font-medium">10 November 2025</p>
      </div>
      <div>
        <p className="text-gray-500">Subject</p>
        <p className="font-medium">Wedding Planning</p>
      </div>
      <div>
        <p className="text-gray-500">Billed to</p>
        <p className="font-medium">John Smith</p>
        <p className="text-gray-500 text-xs">john_s@gmail.com</p>
      </div>
      <div>
        <p className="text-gray-500">Currency</p>
        <p className="font-medium">LKR - Sri Lankan Rupee</p>
      </div>
    </div>
  );
};

export default InvoiceSummary;
