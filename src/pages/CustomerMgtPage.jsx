import React from "react";
import Sidebar from "../component/AdminEvent/Sidebar";
import CustomerTable from "../component/CustomerMgt/CustomerTable";

const CustomerManagementPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto ml-0 md:ml-64"> {/* Responsive margin */}
        <CustomerTable />
      </div>
    </div>
  );
};

export default CustomerManagementPage;