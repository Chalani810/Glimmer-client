import React, { useState, useEffect } from "react";
import Sidebar from "../component/AdminEvent/Sidebar";
import AddEmployeeModel from "../component/Employee/AddEmployeeModel";
import ConfirmationModal from "../component/ConfirmationModal";
import axios from "axios";
import { toast } from "react-hot-toast";

const EmployeeManagement = () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [occupationOptions, setOccupationOptions] = useState([]);


  var toastId;
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${apiUrl}/employee/`);
      setEmployees(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setEmployees([]);
      toast.error("Failed to load employees. Please try again.");
    }
  };
  const fetchOccupations = async () => {
    try {
      const response = await axios.get(`${apiUrl}/role`);
      const options = response.data; 

      console.log(options);
      
      setOccupationOptions(options);
    } catch (error) {
      console.error("Error fetching occupations:", error);
      toast.error("Failed to load occupations.");
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchOccupations();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.length === 0) {
      fetchEmployees();
      return;
    }

    const filtered = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query)
    );
    setEmployees(filtered);
  };

  const handleAddClick = () => {
    setEditingEmployee(null); // This will reset the form data
    setIsModalOpen(true);
    setActiveMenu(null);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
    setActiveMenu(null);
  };

  const handleSave = async (employee) => {
    try {
      toastId = toast.loading(
        editingEmployee ? "Updating employee..." : "Adding employee..."
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const formData = new FormData();
      formData.append("name", employee.name);
      formData.append("email", employee.email);
      formData.append("phone", employee.phone);
      formData.append("occupation", employee.occupation);

      if (employee.file) {
        formData.append("profileImg", employee.file);
      }

      let response;

      if (editingEmployee) {
        response = await axios.put(
          `${apiUrl}/employee/${editingEmployee._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        response = await axios.post(`${apiUrl}/employee/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      toast.success(editingEmployee ? "Employee updated!" : "Employee added!", {
        id: toastId,
      });

      fetchEmployees();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Action failed", {
        duration: 3000,
        id: toastId,
        style: {
          background: "#FF3333",
          color: "#fff",
          minWidth: "250px",
        },
      });
    }
  };

  const handleDelete = async (id) =>{
    try {
      toastId = toast.loading("Deleting employee...");
      await new Promise((resolve) => setTimeout(resolve, 500));
      await axios.delete(`${apiUrl}/employee/${id}`);
      fetchEmployees();
      setActiveMenu(null);
      setShowConfirmModal(false);
      toast.success("Employee deleted successfully!", { id: toastId });
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete employee", { id: toastId });
    }
  };

  const confirmDelete = (id) => {
    setEmployeeToDelete(id);
    setShowConfirmModal(true);
    setActiveMenu(null);
  };

  const toggleMenu = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setActiveMenu(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <div className="flex-1 overflow-auto p-4 md:p-8">
        <div className="max-w-full mx-auto">
          <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
              <h1 className="text-2xl font-bold">Employee Management</h1>
              <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-grow md:flex-grow-0 md:w-64">
                  <input
                    type="text"
                    placeholder="Search employees"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="pl-4 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-md whitespace-nowrap"
                  onClick={handleAddClick}
                >
                  + Add Employee
                </button>
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3 font-medium text-sm text-gray-600">
                      Name
                    </th>
                    <th className="p-3 font-medium text-sm text-gray-600">
                      Occupation
                    </th>
                    <th className="p-3 font-medium text-sm text-gray-600">
                      Availability
                    </th>
                    <th className="p-3 font-medium text-sm text-gray-600 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr
                      key={employee._id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          {employee.profileImg ? (
                            <img
                              src={employee.profileImg}
                              alt={employee.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                              {getInitials(employee.name)}
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-sm text-gray-500">
                              {employee.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        {employee.occupation.title || "Not specified"}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            employee.availability == 0
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {employee.availability == 0
                            ? "Assigned"
                            : "Available"}
                        </span>
                      </td>
                      <td className="p-3 text-center relative">
                        <div className="flex justify-center">
                          <button
                            className="text-gray-500 font-bold hover:bg-gray-100 p-1 rounded"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMenu(employee._id);
                            }}
                          >
                            ⋮
                          </button>

                          {activeMenu === employee._id && (
                            <div className="absolute right-0 mt-6 w-32 bg-white rounded-md shadow-lg z-10 border">
                              <button
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEdit(employee);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  confirmDelete(employee._id);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {employees.length === 0 && (
              <div className="w-full text-center p-8">
                <p className="text-gray-500">No employees found</p>
              </div>
            )}
          </div>
        </div>

        <AddEmployeeModel
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingEmployee(null);
          }}
          onSave={handleSave}
          employeeData={editingEmployee}
          occupationOptions={occupationOptions}
          key={isModalOpen ? (editingEmployee ? `edit-${editingEmployee._id}` : 'add') : 'closed'}
        />

        <ConfirmationModal
          isOpen={showConfirmModal}
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={() => handleDelete(employeeToDelete)}
        />
      </div>
    </div>
  );
};

export default EmployeeManagement;
