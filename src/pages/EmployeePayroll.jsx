import React, { useState, useEffect } from "react";
import Sidebar from "../component/AdminEvent/Sidebar";
import axios from "axios";
import { toast } from "react-hot-toast";

const SalaryView = () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [searchQuery, setSearchQuery] = useState("");
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState({});

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${apiUrl}/employee/`);
      setEmployees(response.data.data);
      setFilteredEmployees(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setEmployees([]);
      setFilteredEmployees([]);
      toast.error("Failed to load employees. Please try again.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.length === 0) {
      setFilteredEmployees(employees);
      return;
    }

    const filteredData = employees.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query)
    );

    setFilteredEmployees(filteredData);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const calculateTotalSalary = (employee) => {
    if (!employee.occupation) return 0;
    return (
      employee.occupation.basicSalary +
      employee.occupation.eventBonus * employee.eventsCount
    );
  };

  const handlePaySalary = async (employee) => {
    setLoadingPayments((prev) => ({ ...prev, [employee._id]: true }));

    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;

      // Calculate salary components
      const basicSalary = employee.occupation?.basicSalary || 0;
      const handledEvents = employee.eventsCount || 0;
      const eventBonus = employee.occupation?.eventBonus || 0;
      const totalSalary = basicSalary + eventBonus * handledEvents;

      // Create salary record via API
      const response = await axios.post(`${apiUrl}/salary`, {
        employeeId: employee._id,
        year,
        month,
        basicSalary,
        handledEvents,
        eventBonus,
        totalSalary,
      });

      // Refresh employee data after successful payment
      await fetchEmployees();

      toast.success("Salary paid successfully!");
    } catch (error) {
      console.error("Error paying salary:", error);
      toast.error(error.response?.data?.message || "Failed to process payment");
    } finally {
      setLoadingPayments((prev) => ({ ...prev, [employee._id]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />
      <div className="flex-1 overflow-auto p-4 md:p-8">
        <div className="max-w-full mx-auto">
          <div className="w-full">
            <div className="flex flex-col w-full">
              {/* Header with search and filters */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <h1 className="text-2xl font-bold">Salary Information</h1>
                <div className="flex gap-2 w-full md:w-auto">
                  <div className="relative flex-grow md:flex-grow-0 md:w-64">
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={handleSearch}
                      className="pl-4 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Salary Table */}
              <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="p-3 font-medium text-sm text-gray-600">
                        User name
                      </th>
                      <th className="p-3 font-medium text-sm text-gray-600">
                        Basic salary
                      </th>
                      <th className="p-3 font-medium text-sm text-gray-600 text-center max-w-[100px]">
                        No of Handled Events
                      </th>
                      <th className="p-3 font-medium text-sm text-gray-600 text-right">
                        Per Event Rate
                      </th>
                      <th className="p-3 font-medium text-sm text-gray-600 text-right">
                        Total Salary
                      </th>
                      <th className="p-3 font-medium text-sm text-gray-600 min-w-[140px]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((item) => (
                      <tr key={item._id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            {item.profileImg ? (
                              <img
                                src={item.profileImg}
                                alt={item.name}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                                {getInitials(item.name)}
                              </div>
                            )}
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">
                                {item.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          LKR{" "}
                          {item.occupation?.basicSalary?.toLocaleString() ||
                            "0"}
                        </td>
                        <td className="p-3 text-center">{item.eventsCount}</td>
                        <td className="p-3 text-right">
                          LKR{" "}
                          {item.occupation?.eventBonus?.toLocaleString() || "0"}
                        </td>
                        <td className="p-3 text-right">
                          LKR {calculateTotalSalary(item).toLocaleString()}
                        </td>
                        <td className="p-3 text-center">
                          {item.salaryPaid ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                              Paid
                              {item.lastPaymentDate && (
                                <span className="ml-1 text-xs text-green-600">
                                  (
                                  {new Date(
                                    item.lastPaymentDate
                                  ).toLocaleDateString("en-GB")}
                                  )
                                </span>
                              )} 
                            </span>
                          ) : (
                            <button
                              onClick={() => handlePaySalary(item)}
                              disabled={loadingPayments[item._id]}
                              className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white ${
                                loadingPayments[item._id]
                                  ? "bg-red-400"
                                  : "bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              }`}
                            >
                              {loadingPayments[item._id] ? (
                                <>
                                  <svg
                                    className="animate-spin -ml-1 mr-1 h-3 w-3 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                  Processing
                                </>
                              ) : (
                                "Pay Now"
                              )}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredEmployees.length === 0 && (
                <div className="w-full text-center p-8">
                  <p className="text-gray-500">No results found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryView;
