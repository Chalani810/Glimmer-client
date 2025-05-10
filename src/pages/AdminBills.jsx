// src/pages/AdminBills.jsx

import React from "react";
import OrderTable from "../component/AdminOrder/OrderTable";
import Sidebar from "../component/AdminEvent/Sidebar";

const AdminBills = () => {
  return (
    <div style={{ display: "flex", minHeight: "5vh" }}>
      
      {/* Sidebar on the left */}
      <div style={{ width: "250px", backgroundColor: "#f0f0f0" }}>
        <Sidebar />
      </div>

      {/* Main content on the right */}
      <div style={{ flex: 1, padding: "20px" }}>
        <OrderTable />
      </div>
      
    </div>
  );
};

export default AdminBills;
