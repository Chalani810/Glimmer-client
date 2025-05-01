import React, { useEffect, useState } from "react";
import { fetchOrders } from "../../services/fetchOrders";
import OrderRow from "./OrderRow";
import OrderModal from "./OrderModal";
import ConfirmationModal from "../../component/ConfirmationModal";
import EditOrderModal from "./EditOrderModal";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    fetchOrders().then((data) => {
      console.log("Fetched orders:", data);
      setOrders(data);
    });
  }, []);

  const handleStatusChange = (id, status) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === id ? { ...order, status: status } : order
      )
    );
  };

  const handleDelete = (id) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
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
              <th className="px-6 py-2">Full Amount</th>
              <th className="px-6 py-2">Advance Payment</th>
              <th className="px-6 py-2">Due Payment</th>
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
                onDelete={() => setOrderToDelete(order)}
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
