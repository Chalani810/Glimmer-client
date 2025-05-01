import React from "react";

const InvoiceDescription = () => {
  return (
    <div className="border rounded-md p-4 mb-6">
      <div className="flex items-center gap-4">
        <img
          src="/assets/images/wedding-planning.jpg" // Update path if needed
          alt="Wedding Planning"
          className="h-16 w-16 object-cover rounded-md"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-700">Wedding Planning</h3>
          <p className="text-xs text-gray-400">
            Lorem ipsum dolor sit amet consectetur. Sit laoreet ut laoreet.
          </p>
        </div>
        <p className="font-semibold">LKR 550,000</p>
      </div>
    </div>
  );
};

export default InvoiceDescription;
