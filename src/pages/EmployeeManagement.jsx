import React, { useState, useEffect } from 'react';
import EmployeeList from '../component/Employee/EmployeeList';
import EmployeeFilter from '../component/Employee/EmployeeFilter';
import Sidebar from "../component/AdminEvent/Sidebar";
import AddEmployeeModel from '../component/Employee/AddEmployeeModel';
import axios from "axios";

const EmployeeManagement = () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${apiUrl}/employee/`);
      setEmployees(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setEmployees([]);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      fetchEmployees();
      return;
    }
    const filtered = employees.filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setEmployees(filtered);
  };

  const handleAddClick = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleSave = async (employee) => {
    try {
      const formData = new FormData();
      formData.append('name', employee.name);
      formData.append('email', employee.email);
      formData.append('phone', employee.phone);
      
      if (employee.file) {
        formData.append('profileImg', employee.file);
      }

      let response;
      if (editingEmployee) {
        // Update existing employee
        response = await axios.put(
          `${apiUrl}/employee/${editingEmployee._id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      } else {
        
        response = await axios.post(
          `${apiUrl}/employee/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      }

      console.log("Success:", response.data);
      fetchEmployees();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/employee/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Employees</h1>
          <div className="flex gap-4">
            <EmployeeFilter onSearch={handleSearch} />
            <button
              className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={handleAddClick}
            >
              + Add Employee
            </button>
          </div>
        </div>

        <EmployeeList 
          employees={employees} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
        
        <AddEmployeeModel
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          employeeData={editingEmployee}
        />
      </main>
    </div>
  );
};

export default EmployeeManagement;