import React, { useEffect, useState } from "react";
import OrderRow from "./OrderRow";
import OrderModal from "./OrderModal";
import ConfirmationModal from "../../component/ConfirmationModal";
import EditOrderModal from "./EditOrderModal";
import axios from "axios";

const OrderTable = () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
  
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${apiUrl}/checkout/getAll`);
      setOrders(response.data);
      console.log("Fetched orders:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = (id, status) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order._id === id ? { ...order, status } : order
      )
    );
  };

  const handleView = (order) => {
    setSelectedOrder(order);
  };

  const handleDeleteClick = (order) => {
    setOrderToDelete(order);
    setDeleting(true);
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/checkout/delete/${id}`);
      fetchOrders();
      console.log(`Order ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting order:", error);
    } finally {
      setDeleting(false);
      setOrderToDelete(null);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Bills</h2>
      
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders to display.</p>
      ) : isMobile ? (
        // Mobile view - cards
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Order #{order.orderId || "N/A"}</p>
                  <p className="text-sm text-gray-600">{order.eventName || "N/A"}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Date</p>
                  <p>{order.eventDate || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total</p>
                  <p>Rs {Number(order.cartTotal || 0).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Advance</p>
                  <p>Rs {Number(order.advancePayment || 0).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Due</p>
                  <p>Rs {Number((order.cartTotal || 0) - (order.advancePayment || 0)).toFixed(2)}</p>
                </div>
              </div>
              
              <div className="mt-3 flex justify-end space-x-2">
                <button 
                  onClick={() => handleView(order)}
                  className="text-blue-600 hover:text-blue-800 p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button 
                  onClick={() => handleEdit(order)}
                  className="text-green-600 hover:text-green-800 p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button 
                  onClick={() => handleDeleteClick(order)}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Desktop view - table
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold">
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Event Name</th>
                <th className="px-4 py-2">Event Date</th>
                <th className="px-4 py-2">Full Amount (Rs)</th>
                <th className="px-4 py-2">Advance (Rs)</th>
                <th className="px-4 py-2">Due (Rs)</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <OrderRow
                  key={order._id}
                  order={order}
                  onView={() => handleView(order)}
                  onEdit={() => handleEdit(order)}
                  onDelete={() => handleDeleteClick(order)}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {deleting && (
        <ConfirmationModal
          isOpen={deleting}
          onCancel={() => {
            setDeleting(false);
            setOrderToDelete(null);
          }}
          onConfirm={() => {
            handleDelete(orderToDelete._id);
          }}
        />
      )}

      {editingOrder && (
        <EditOrderModal
          order={editingOrder}
          onClose={() => setEditingOrder(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

// Helper function for status colors
const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800";
    case "Confirmed":
      return "bg-blue-100 text-blue-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default OrderTable;