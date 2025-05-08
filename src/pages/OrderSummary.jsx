import React from "react";

const OrderSummary = ({ order }) => {
  // Test data for fallback
  const testOrder = {
    orderNumber: "ORD12345",
    status: "Pending",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    mobile: "0771234567",
    contactMethod: "Email",
    address: "123 Main Street, Colombo",
    comment: "Please deliver between 2-4 PM.",
    advancePayment: 2000,
    totalAmount: 5000,
    eventName: "Wedding Reception",
    assignedEmployee: "Jane Smith",
    eventDate: "2025-05-10",
    items: [
      { name: "Chair", quantity: 4, price: 1000 },
      { name: "Table", quantity: 1, price: 3000 },
    ],
  };

  const currentOrder = order || testOrder;

  const dueAmount =
    currentOrder.totalAmount && currentOrder.advancePayment
      ? currentOrder.totalAmount - currentOrder.advancePayment
      : 0;

  const statusColor = {
    Completed: "text-green-600 border-green-600 bg-green-50",
    Pending: "text-yellow-600 border-yellow-600 bg-yellow-50",
    Rejected: "text-red-600 border-red-600 bg-red-50",
    Default: "text-gray-600 border-gray-400 bg-gray-50",
  };

  const statusClass =
    statusColor[currentOrder.status] || statusColor["Default"];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md text-gray-800 print:p-0 print:shadow-none print:bg-white">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Order Summary</h1>
          <p className="text-sm text-gray-500">Order No: {currentOrder.orderNumber}</p>
        </div>
        <div className={`px-3 py-1 rounded-full border text-sm ${statusClass}`}>
          {currentOrder.status}
        </div>
      </div>

      {/* Customer Information */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Customer & Event Details</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <p><span className="font-medium">Name:</span> {currentOrder.firstName} {currentOrder.lastName}</p>
          <p><span className="font-medium">Email:</span> {currentOrder.email}</p>
          <p><span className="font-medium">Mobile:</span> {currentOrder.mobile}</p>
          <p><span className="font-medium">Preferred Contact:</span> {currentOrder.contactMethod}</p>
          <p className="col-span-2"><span className="font-medium">Address:</span> {currentOrder.address}</p>
          {currentOrder.comment && (
            <p className="col-span-2"><span className="font-medium">Comment:</span> {currentOrder.comment}</p>
          )}
          <p><span className="font-medium">Event Name:</span> {currentOrder.eventName}</p>
          <p><span className="font-medium">Assigned Employee:</span> {currentOrder.assignedEmployee}</p>
          <p><span className="font-medium">Event Date:</span> {currentOrder.eventDate}</p>
        </div>
      </div>

      {/* Ordered Items */}
      {currentOrder.items && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Ordered Items</h2>
          <table className="w-full text-sm border">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2 border">Item</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Price</th>
              </tr>
            </thead>
            <tbody>
              {currentOrder.items.map((item, i) => (
                <tr key={i}>
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">{item.quantity}</td>
                  <td className="p-2 border">Rs. {item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Payment Info */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Payment Summary</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <p><span className="font-medium">Advance Paid:</span> Rs. {currentOrder.advancePayment || 0}</p>
          <p><span className="font-medium">Total Amount:</span> Rs. {currentOrder.totalAmount || 0}</p>
          <p><span className="font-medium">Amount Due:</span> Rs. {dueAmount}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
