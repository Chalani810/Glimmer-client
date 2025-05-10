import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash, FaUsers } from "react-icons/fa";

const OrderRow = ({
  order,
  onStatusChange,
  onDelete,
  onView,
  onEdit,
  onAssignEmployees,
}) => {
  const [status, setStatus] = useState(order?.status || "Pending");
  const [isChangingStatus, setIsChangingStatus] = useState(false);

  // Sync status with order prop
  useEffect(() => {
    if (order?.status && order.status !== status) {
      setStatus(order.status);
    }
  }, [order?.status]);

  const getStatusClasses = (currentStatus) => {
    switch (currentStatus) {
      case "Completed":
        return "bg-green-100 text-green-700 border border-green-300";
      case "Confirmed":
        return "bg-blue-100 text-blue-700 border border-blue-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case "Cancelled":
        return "bg-red-100 text-red-700 border border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  if (!order) {
    return null;
  }

  return (
    <tr className="border-b hover:bg-gray-50 transition flex flex-col md:table-row">
      {/* Order ID - Always visible */}
      <td className="px-4 py-3 font-medium md:font-normal">
        <span className="md:hidden">Order #</span>
        {order.orderId || "N/A"}
      </td>

      {/* Customer Name - Hidden on small screens */}
      <td className="px-4 py-3 hidden md:table-cell">
        {`${order.firstName || ""} ${order.lastName || ""}`.trim() || "N/A"}
      </td>

      {/* Email - Hidden on small screens */}
      <td className="px-4 py-3 hidden md:table-cell">
        {order.email || "N/A"}
      </td>

      {/* Amounts - Stacked on mobile */}
      <td className="px-4 py-3">
        <div className="flex flex-col md:block">
          <span className="md:hidden font-medium">Total: </span>
          <span className="text-right">{Number(order.cartTotal || 0).toFixed(2)}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-col md:block">
          <span className="md:hidden font-medium">Advance: </span>
          <span className="text-right">{Number(order.advancePayment || 0).toFixed(2)}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-col md:block">
          <span className="md:hidden font-medium">Balance: </span>
          <span className="text-right">
            {Number((order.cartTotal || 0) - (order.advancePayment || 0)).toFixed(2)}
          </span>
        </div>
      </td>

      {/* Status - Always visible */}
      <td className="px-4 py-3">
        <div
          className={`text-sm px-2 py-1 rounded inline-block ${getStatusClasses(
            status
          )}`}
        >
          {status}
        </div>
        {isChangingStatus && (
          <span className="ml-2 text-xs text-gray-500">Saving...</span>
        )}
      </td>

      {/* Action Buttons - Always visible */}
      <td className="px-4 py-3 flex justify-end md:justify-start gap-3">
        <button
          onClick={() => onView?.(order)}
          className="text-blue-600 hover:text-blue-800"
          title="View Order"
        >
          <FaEye className="w-4 h-4" />
        </button>
        <button
          onClick={() => onEdit?.(order)}
          className="text-green-600 hover:text-green-800"
          title="Edit Order"
        >
          <FaEdit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onAssignEmployees?.(order)}
          className="text-purple-600 hover:text-purple-800"
          title="Assign Employees"
        >
          <FaUsers className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete?.(order._id)}
          className="text-red-600 hover:text-red-800"
          title="Delete Order"
        >
          <FaTrash className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;