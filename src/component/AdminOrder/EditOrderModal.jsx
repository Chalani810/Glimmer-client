import React, { useState } from "react";

const EditOrderModal = ({ order, onClose, onStatusChange }) => {
  const [newStatus, setNewStatus] = useState(order.status || "");

  const handleSave = () => {
    if (newStatus) {
      onStatusChange(order._id, newStatus);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end items-start p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30"
        onClick={onClose}
      ></div>

      {/* Right-side modal */}
      <div className="relative w-80 bg-white rounded-lg shadow-lg p-4">
        <div className="mb-3">
          <h2 className="text-md font-semibold text-gray-800">Edit Order Status</h2>
          <p className="text-xs text-gray-500">Order ID: {order.orderNumber}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOrderModal;
