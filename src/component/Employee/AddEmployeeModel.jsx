import React, { useState, useEffect } from 'react';

const AddEmployeeModel = ({ isOpen, onClose, onSave, employeeData }) => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    profileImg: '',
  });
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (employeeData) {
      setEmployee(employeeData);
      setPreviewImage(employeeData.profileImg || '');
    } else {
      setEmployee({
        name: '',
        email: '',
        phone: '',
        profileImg: '',
      });
      setPreviewImage('');
    }
  }, [employeeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEmployee({ ...employee, file });
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[400px] relative shadow-xl">
        <div className="flex flex-col items-center space-y-4">
          <label className="relative">
            <img
              src={previewImage || 'https://via.placeholder.com/100'}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <input
              type="file"
              name="profileImg"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />
          </label>

          <input
            name="name"
            value={employee.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 w-full rounded"
            required
          />
          <input
            name="email"
            value={employee.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 w-full rounded"
            required
            type="email"
          />
          <input
            name="phone"
            value={employee.phone}
            onChange={handleChange}
            placeholder="Phone number"
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div className="flex justify-end mt-6 space-x-2">
          <button 
            type="button"
            onClick={onClose} 
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave(employee)}
            className="bg-black text-white px-4 py-2 rounded"
          >
            {employeeData ? 'Save' : 'Add user'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModel;