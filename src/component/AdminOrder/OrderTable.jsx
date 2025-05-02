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
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const fetchOrders = async (setOrders) => {
    try {
      const response = await axios.get(`${apiUrl}/checkout/getAll`);
      setOrders(response.data);

      console.log("Fetched orders:", response.data); // Debugging log	
      
    } catch (error) {
      console.error("Error fetching data:", error);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders(setOrders);
  }, []);

  const handleStatusChange = (id, status) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === id ? { ...order, status: status } : order
      )
    );
  };

  const handleView = (order) => {
    setSelectedOrder(order);
  };


  const handleEdit = (e, id) => {
    const order = orders.find((o) => o._id === id);
    const rect = e.currentTarget.getBoundingClientRect();
    setModalPosition({
      top: rect.top + window.scrollY + 30, // Below the button
      left: rect.left + window.scrollX,   // Near the button
    });
    setEditingOrder(order);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/checkout/delete/${id}`);
      fetchOrders(setOrders);
      console.log(`Order ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="p-6 relative">
      <h2 className="text-2xl font-bold mb-4">Bills</h2>
      {orders.length === 0 ? (
        <p>No orders to display.</p>
      ) : (
        <table className="min-w-full bg-white rounded shadow ml-4">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold">
              <th className="px-6 py-2">Order ID</th>
              <th className="px-6 py-2">Event Name</th>
              <th className="px-6 py-2">Event Date</th>
              <th className="px-6 py-2">Full Amount (Rs)</th>
              <th className="px-6 py-2">Advance Payment (Rs)</th>
              <th className="px-6 py-2">Due Payment (Rs)</th>
              <th className="px-6 py-2">Contact Method</th>
              <th className="px-6 py-2">Guest Count</th>
              <th className="px-6 py-2">Assigned Employee</th>
              <th className="px-6 py-2">Status</th>
              <th className="px-6 py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderRow
                key={order._id}
                order={order}
                onView={() => handleView(order)}
                onEdit={(e) => handleEdit(e, order._id)}
                onDelete={() => handleDelete(order._id)}
                onStatusChange={handleStatusChange}
              />
            ))}
          </tbody>
        </table>
      )}

      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      <ConfirmationModal
        isOpen={!!orderToDelete}
        onCancel={() => setOrderToDelete(null)}
        onConfirm={() => {
          handleDelete(orderToDelete._id);
          setOrderToDelete(null);
        }}
      />

      {editingOrder && (
        <EditOrderModal
          order={editingOrder}
          onClose={() => setEditingOrder(null)}
          onStatusChange={handleStatusChange}
          position={modalPosition}
        />
      )}
    </div>
  );
};

export default OrderTable;
