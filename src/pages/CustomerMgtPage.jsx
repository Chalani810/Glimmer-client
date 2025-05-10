import React from "react";
import Sidebar from "../component/Admin/Sidebar";
import Topbar from "../component/CustomerMgt/Topbar";
import CustomerTable from "../component/CustomerMgt/CustomerTable";

const CustomerManagementPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Topbar />
        <CustomerTable />
      </div>
    </div>
  );
};

export default CustomerManagementPage;
