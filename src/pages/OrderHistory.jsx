import React, { useState, useEffect } from "react";
import OrderRow from "../component/AdminOrder/OrderRow";
import OrderModal from "../component/AdminOrder/OrderModal";
// import EmployeeAssignmentModal from "./EmployeeAssignmentModal";

const OrderHistory = () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [orders, setOrders] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [assignOrder, setAssignOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please log in to view order history.");
          setLoading(false);
          return;
        }

        // Fetch orders
        const orderResponse = await fetch(`${apiUrl}/admin/bills`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!orderResponse.ok) {
          const data = await orderResponse.json();
          throw new Error(data.message || "Failed to fetch orders");
        }
        const orderData = await orderResponse.json();
        setOrders(orderData);

        // Fetch employees
        const employeeResponse = await fetch(`${apiUrl}/employees`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!employeeResponse.ok) {
          const data = await employeeResponse.json();
          throw new Error(data.message || "Failed to fetch employees");
        }
        const employeeData = await employeeResponse.json();
        setEmployees(employeeData);

        setLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred while fetching data.");
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/admin/bills/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update status");
      }
      const updatedOrder = await response.json();
      setOrders(orders.map(o => (o._id === orderId ? updatedOrder : o)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAssignEmployees = (order) => {
    setAssignOrder(order);
  };

  const handleAssignSubmit = async (orderId, employeeIds) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/admin/bills/${orderId}/assign`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ employeeIds }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to assign employees");
      }
      const updatedOrder = await response.json();
      setOrders(orders.map(o => (o._id === orderId ? updatedOrder : o)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/admin/bills/${orderId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete order");
      }
      setOrders(orders.filter(o => o._id !== orderId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (order) => {
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 min-w-0">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Order History</h2>

      {loading && <p className="text-gray-600 text-center">Loading orders...</p>}

      {error && (
        <div className="mb-4 p-2 rounded bg-red-100 text-red-700">{error}</div>
      )}

      {!loading && !error && orders.length === 0 && (
        <p className="text-gray-600 text-center">No orders found.</p>
      )}

      {!loading && !error && orders.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 font-medium text-gray-800">Order Number</th>
                <th className="p-3 font-medium text-gray-800">Customer</th>
                <th className="p-3 font-medium text-gray-800">Email</th>
                <th className="p-3 font-medium text-gray-800">Total</th>
                <th className="p-3 font-medium text-gray-800">Advance</th>
                <th className="p-3 font-medium text-gray-800">Due</th>
                <th className="p-3 font-medium text-gray-800">Contact Method</th>
                <th className="p-3 font-medium text-gray-800">Guests</th>
                <th className="p-3 font-medium text-gray-800">Assigned Employees</th>
                <th className="p-3 font-medium text-gray-800">Status</th>
                <th className="p-3 font-medium text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <OrderRow
                  key={order._id}
                  order={order}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                  onView={handleViewDetails}
                  onEdit={handleEdit}
                  onAssignEmployees={handleAssignEmployees}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedOrder && (
        <OrderModal order={selectedOrder} onClose={handleCloseModal} />
      )}

      {/* {assignOrder && (
        <EmployeeAssignmentModal
          order={assignOrder}
          employees={employees}
          onClose={() => setAssignOrder(null)}
          onAssign={handleAssignSubmit}
        />
      )} */}
    </div>
  );
};

export default OrderHistory;