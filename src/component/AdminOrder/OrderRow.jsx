import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const OrderRow = ({ order, onStatusChange, onDelete, onView, onEdit }) => {
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

  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="px-4 py-3">{order.orderNumber}</td>
      <td className="px-4 py-3">{order.eventName}</td>
      <td className="px-4 py-3">{order.eventDate}</td>
      <td className="px-4 py-3">Rs. {order.totalAmount}</td>
      <td className="px-4 py-3">Rs. {order.advancePayment}</td>
      <td className="px-4 py-3">
        Rs. {order.totalAmount - order.advancePayment}
      </td>
      <td className="px-4 py-3">
        <select
          value={order.status}
          onChange={(e) => onStatusChange(order._id, e.target.value)}
          className={`text-sm px-2 py-1 rounded ${getStatusClasses(
            order.status
          )}`}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Rejected">Rejected</option>
        </select>
      </td>
      <td className="px-4 py-3 text-right flex justify-end gap-3">
        <button onClick={onView} className="text-blue-600 hover:text-blue-800">
          <FaEye className="w-4 h-4" />
        </button>
        <button
          onClick={onEdit}
          className="text-green-600 hover:text-green-800"
        >
          <FaEdit className="w-4 h-4" />
        </button>
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-800"
        >
          <FaTrash className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;
