// Side Panel
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Calendar", path: "/calendar" },
    { name: "All Products", path: "/products" },
    { name: "Bills", path: "/admin-bills" },
    { name: "Events", path: "/AdminEvents" },
    { name: "Customers", path: "/customers" },
    { name: "Employees", path: "/EmployeeManagement" },
    { name: "Employee Payroll", path: "/payroll" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <aside className="w-64 bg-white p-4 border-r hidden md:block">
      {/* Logo */}

      <div className="text-2xl font-extrabold text-black">
        <span className="text-red-500">Glim</span>mer
      </div>
      

      <div className="text-2xl font-bold mb-8 text-red-500">Glimmer</div>


      {/* Navigation Links */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`px-3 py-2 rounded hover:bg-red-100 transition ${
                isActive
                  ? "bg-red-400 text-white font-semibold"
                  : "text-gray-700"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
