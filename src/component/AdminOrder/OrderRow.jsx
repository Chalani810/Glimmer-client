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
      <td className="px-4 py-3">{order.orderId}</td>
      <td className="px-4 py-3">test</td>
      <td className="px-4 py-3">test</td>
      <td className="px-4 py-3 text-right">
        {Number(order.totalAmount).toFixed(2)}
      </td>
      <td className="px-4 py-3 text-right">
        {Number(order.advancePayment).toFixed(2)}
      </td>
      <td className="px-4 py-3 text-right">
        {Number(order.totalAmount - order.advancePayment).toFixed(2)}
      </td>
      <td className="px-4 py-3">{order.contactMethod}</td>
      <td className="px-4 py-3">{order.guestcount}</td>
      <td className="px-4 py-3">{order.assignedEmployee}</td>
      <td className="px-4 py-3">
        <span
          className={`text-sm px-2 py-1 rounded ${getStatusClasses(
            order.status
          )}`}
        >
          {order.status}
        </span>
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
        <button onClick={onDelete} className="text-red-600 hover:text-red-800">
          <FaTrash className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;
