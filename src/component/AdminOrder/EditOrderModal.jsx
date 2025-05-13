import React, { useState, useEffect } from "react";
import axios from "axios";


const EditOrderModal = ({ order, onClose, onStatusChange, employees }) => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [newStatus, setNewStatus] = useState(order.status || "");
 const [selectedEmployees, setSelectedEmployees] = useState(order.assignedEmployees || []);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (empId) => {
    if (selectedEmployees.includes(empId)) {
      // Remove if already selected
      setSelectedEmployees(selectedEmployees.filter((id) => id !== empId));
    } else {
      // Add new selection
      setSelectedEmployees([...selectedEmployees, empId]);
    }
  };

  const handleSave = async () => {
    if (!newStatus) {
      setError("Please select a status.");
      return;
    }
  
    setLoading(true);
  
    try {
      // Update order status in DB
      const response = await axios.put(`${apiUrl}/checkout/${order._id}/status`, {
        status: newStatus,
        assignedEmployees: selectedEmployees,
      });
  
      // Notify parent component (optional)
      onStatusChange(order._id, newStatus, selectedEmployees);
      onClose();
    } catch (error) {
      console.error("Failed to update order status:", error);
      setError("Failed to update status. Try again.");
    } finally {
      setLoading(false);
    }
  };
  

  // Allow ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-start justify-end z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-80 bg-white rounded-lg shadow-xl m-4 p-4 transition-all">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Edit Order</h2>
          <p className="text-xs text-gray-500 mt-1">Order ID: {order.orderNumber}</p>
        </div>

        {/* Status Selection */}
        <div className="mb-5">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            id="status"
            value={newStatus}
            onChange={(e) => {
              setNewStatus(e.target.value);
              setError("");
            }}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="">Select status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>

       <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Assign Employees
  </label>
  <div className="max-h-40 overflow-y-auto border rounded px-2 py-1">
    {employees?.map(emp => (
      <label key={emp._id} className="flex items-center space-x-2 p-1 hover:bg-gray-50 rounded">
        <input
          type="checkbox"
          checked={selectedEmployees.includes(emp._id)}
          onChange={() => {
            setSelectedEmployees(prev => 
              prev.includes(emp._id)
                ? prev.filter(id => id !== emp._id)
                : [...prev, emp._id]
            );
          }}
          className="rounded text-blue-600 focus:ring-blue-500"
        />
        <span>{emp.name}</span>
      </label>
    ))}
  </div>
</div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOrderModal;
