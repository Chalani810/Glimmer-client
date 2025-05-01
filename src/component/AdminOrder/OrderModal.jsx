import React from "react";

const OrderModal = ({ order, onClose }) => {
  // Function to get the correct status text color and background class
  const getStatusClasses = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 border border-green-300"; // Green for Completed
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300"; // Yellow for Pending
      case "Rejected":
        return "bg-red-100 text-red-700 border border-red-300"; // Red for Rejected
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300"; // Default gray for other statuses
    }
  };

  // Function to get the correct heading color based on the order status
  const getHeadingClasses = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-700"; // Green for Completed
      case "Pending":
        return "text-yellow-700"; // Yellow for Pending
      case "Rejected":
        return "text-red-700"; // Red for Rejected
      default:
        return "text-gray-700"; // Default gray for other statuses
    }
  };

  const statusClasses = getStatusClasses(order.status); // Get the status classes
  const headingClasses = getHeadingClasses(order.status); // Get the heading classes

  // Calculate due payment if available
  const duePayment = order.totalAmount && order.advancePayment ? order.totalAmount - order.advancePayment : 0;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">Order Details</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Customer Information Section */}
        <div className="mb-6">
          <h4 className={`text-xl font-medium ${headingClasses} mb-4`}>
            Customer Information
          </h4>
          <div className="grid grid-cols-2 gap-6">
            <p>
              <strong className="text-gray-600">Name:</strong>{" "}
              {order.firstName} {order.lastName}
            </p>
            <p>
              <strong className="text-gray-600">Email:</strong> {order.email}
            </p>
            <p>
              <strong className="text-gray-600">Phone:</strong>{" "}
              {order.telephone || order.mobile}
            </p>
            <p>
              <strong className="text-gray-600">Mobile:</strong>{" "}
              {order.mobile || "Not provided"}
            </p>
            <p>
              <strong className="text-gray-600">Preferred Contact:</strong>{" "}
              {order.contactMethod}
            </p>
            <p>
              <strong className="text-gray-600">Address:</strong>{" "}
              {order.address}
            </p>
            <p className="col-span-2">
              <strong className="text-gray-600">Comment:</strong>{" "}
              {order.comment || "No additional comments"}
            </p>
          </div>
        </div>

        {/* Payment Information Section */}
        <div className="mb-6">
          <h4 className={`text-xl font-medium ${headingClasses} mb-4`}>
            Payment Information
          </h4>
          <div className="grid grid-cols-2 gap-6">
            <p><strong className="text-gray-600">Advance Payment:</strong> Rs. {order.advancePayment}</p>
            <p><strong className="text-gray-600">Full Amount:</strong> Rs. {order.totalAmount || "Not available"}</p>
            <p><strong className="text-gray-600">Due Payment:</strong> Rs. {duePayment || "Not available"}</p> {/* New due payment */}
          </div>
        </div>

        {/* Payment Slip Section */}
        <div className="mb-6">
          <h4 className={`text-xl font-medium ${headingClasses} mb-4`}>
            Payment Slip
          </h4>
          <div className="flex justify-center mb-2">
            <img
              src={order.slip}
              alt="Payment Slip"
              className="w-full max-w-xs rounded-md border border-gray-200"
            />
          </div>
        </div>

        {/* Order Status Section */}
        <div className="mb-6">
          <h4 className={`text-xl font-medium ${headingClasses} mb-4`}>
            Order Status
          </h4>
          <p
            className={`inline-block text-sm px-4 py-2 rounded-full ${statusClasses}`}
          >
            {order.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
