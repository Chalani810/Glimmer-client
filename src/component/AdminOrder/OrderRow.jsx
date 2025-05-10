import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const OrderRow = ({ order, onStatusChange, onDelete, onView, onEdit, onAssignEmployees }) => {
  const [status, setStatus] = useState(order.status);

  const getStatusClasses = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 border border-green-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case "Rejected":
        return "bg-red-100 text-red-700 border border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    await onStatusChange(order._id, newStatus);
  };

  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="px-4 py-3">{order.orderId || "N/A"}</td>
      <td className="px-4 py-3">{`${order.firstName} ${order.lastName}`}</td>
      <td className="px-4 py-3">{order.email}</td>
      <td className="px-4 py-3 text-right">{Number(order.cartTotal).toFixed(2)}</td>
      <td className="px-4 py-3 text-right">{Number(order.advancePayment).toFixed(2)}</td>
      <td className="px-4 py-3 text-right">{Number(order.cartTotal - order.advancePayment).toFixed(2)}</td>
      <td className="px-4 py-3">{order.contactMethod}</td>
      <td className="px-4 py-3">{order.guestcount}</td>
      <td className="px-4 py-3">
        {order.assignedEmployees?.map(emp => `${emp.firstName} ${emp.lastName}`).join(", ") || "Not assigned"}
      </td>
      <td className="px-4 py-3">
        <select
          value={status}
          onChange={handleStatusChange}
          className={`text-sm px-2 py-1 rounded ${getStatusClasses(status)} focus:outline-none`}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Rejected">Rejected</option>
        </select>
      </td>
      <td className="px-4 py-3 text-right flex justify-end gap-3">
        <button onClick={() => onView(order)} className="text-blue-600 hover:text-blue-800">
          <FaEye className="w-4 h-4" />
        </button>
        <button onClick={() => onEdit(order)} className="text-green-600 hover:text-green-800">
          <FaEdit className="w-4 h-4" />
        </button>
        <button onClick={() => onAssignEmployees(order)} className="text-purple-600 hover:text-purple-800">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
        <button onClick={() => onDelete(order._id)} className="text-red-600 hover:text-red-800">
          <FaTrash className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;