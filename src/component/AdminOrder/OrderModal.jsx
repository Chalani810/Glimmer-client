import React from "react";

const OrderModal = ({ order, onClose }) => {
  const getStatusClasses = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 border border-green-300"; // Green for Completed
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300"; // Yellow for Pending
      case "Rejected":
        return "bg-red-100 text-red-700 border border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  const getHeadingClasses = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-700"; // Green for Completed
      case "Pending":
        return "text-yellow-700"; // Yellow for Pending
      case "Rejected":
        return "text-red-700"; // Red for Rejected
      default:
        return "text-gray-700";
    }
  };

  const statusClasses = getStatusClasses(order.status); // Get the status classes
  const headingClasses = getHeadingClasses(order.status); // Get the heading classes

  const duePayment =
    order.totalAmount && order.advancePayment
      ? order.totalAmount - order.advancePayment
      : 0;

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-start justify-center z-50 overflow-y-auto py-8 transition-all"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl my-8 mx-4 overflow-hidden border border-gray-100">
        {/* Header - Sticky with subtle gradient */}
        <div className="sticky top-0 bg-gradient-to-b from-white to-white/90 z-10 px-6 py-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-gray-800">
              Order Details
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none"
              aria-label="Close"
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
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-12rem)] space-y-6">
          {/* Customer Information Section */}
          <div className="bg-gray-50 rounded-lg p-5">
            <h4
              className={`text-lg font-medium text-gray-700 mb-4 flex items-center`}
            >
              <svg
                className="w-5 h-5 mr-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Order Status
            </h4>
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-opacity-10 ${statusClasses}">
              <span
                className={`w-2 h-2 rounded-full mr-2 ${statusClasses.replace(
                  "bg-opacity-10",
                  ""
                )}`}
              ></span>
              {order.status}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-5">
            <h4
              className={`text-lg font-medium text-gray-700 mb-4 flex items-center`}
            >
              <svg
                className="w-5 h-5 mr-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Customer Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <p className="text-gray-600">
                  <span className="font-medium text-gray-700">Name:</span>{" "}
                  <span className="text-gray-800">
                    {order.firstName} {order.lastName}
                  </span>
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-700">Email:</span>{" "}
                  <span className="text-gray-800 break-all">{order.email}</span>
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-700">Phone:</span>{" "}
                  <span className="text-gray-800">
                    {order.telephone || order.mobile || "—"}
                  </span>
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-gray-600">
                  <span className="font-medium text-gray-700">
                    Contact Method:
                  </span>{" "}
                  <span className="text-gray-800 capitalize">
                    {order.contactMethod}
                  </span>
                </p>
                <div className="space-y-3">
                <p className="text-gray-600">
                  <span className="font-medium text-gray-700">
                    Participated Guests Count:
                  </span>{" "}
                  <span className="text-gray-800 capitalize">
                    {order.guestcount}
                  </span>
                </p>
                </div>
                <p className="text-gray-600 md:col-span-2">
                  <span className="font-medium text-gray-700">Address:</span>{" "}
                  <span className="text-gray-800">
                    {order.address || "Not provided"}
                  </span>
                </p>
              </div>
              <p className="md:col-span-2 text-gray-600">
                <span className="font-medium text-gray-700">Comments:</span>{" "}
                <span className="text-gray-800 italic">
                  {order.comment || "No additional comments"}
                </span>
              </p>
            </div>
          </div>

          {/* Payment Information Section */}
          <div className="bg-gray-50 rounded-lg p-5">
            <h4
              className={`text-lg font-medium text-gray-700 mb-4 flex items-center`}
            >
              <svg
                className="w-5 h-5 mr-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Payment Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <p className="text-sm text-gray-500">Advance Payment</p>
                <p className="text-lg font-semibold text-gray-800">
                  Rs. {Number(order.advancePayment).toFixed(2)}
                </p>
              </div>
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-lg font-semibold text-gray-800">
                  Rs. {Number(order.totalAmount).toFixed(2)}
                </p>
              </div>
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <p className="text-sm text-gray-500">Due Payment</p>
                <p className="text-lg font-semibold text-gray-800">
                  Rs. {Number(order.totalAmount - order.advancePayment).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Slip Section */}
          {order.slipUrl && (
            <div className="bg-gray-50 rounded-lg p-5">
              <h4
                className={`text-lg font-medium text-gray-700 mb-4 flex items-center`}
              >
                <svg
                  className="w-5 h-5 mr-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                Payment Slip
              </h4>
              <div className="flex justify-center">
                <div className="bg-white p-2 rounded-md border border-gray-200 shadow-sm">
                  <img
                    src={order.slipUrl}
                    alt="Payment Slip"
                    className="max-w-full h-auto max-h-64 rounded"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/path-to-fallback-image.png";
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
