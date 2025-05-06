// Side Panel
import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white p-4 border-r hidden md:block">
      {/* Logo */}
      <div className="text-2xl font-extrabold text-black">
        <span className="text-red-500">Glim</span>mer
      </div>
      
      {/* Navigation Links */}
      <nav className="flex flex-col gap-4">
        {["Home", "Calendar", "All Products", "Bills", "Events", "Customers", "Employees", "Employee Payroll", "Settings"].map((item) => (
          <a
            key={item}
            href="#"
            className={`hover:text-red-400 ${item === "Events" ? "bg-red-400 text-white rounded px-2 py-1" : ""}`}
          >
            {item}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
