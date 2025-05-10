import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      postalCode: '',
      country: ''
    },
    profilePicture: null
  });
  const [previewImage, setPreviewImage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const validateField = (name, value) => {
    const errors = { ...fieldErrors };
    
    switch (name) {
      case "firstName":
      case "lastName":
      case "address.country":
        if (!value.trim()) {
          errors[name] = "This field is required";
        } else if (!/^[a-zA-Z\s-]+$/.test(value)) {
          errors[name] = "Only alphabetic characters and hyphens allowed";
        } else {
          delete errors[name];
        }
        break;
        
      case "address.city":
        if (!value.trim()) {
          errors[name] = "This field is required";
        } else if (!/^[a-zA-Z0-9\s-]+$/.test(value)) {
          errors[name] = "Only alphanumeric characters, spaces and hyphens allowed";
        } else {
          delete errors[name];
        }
        break;
        
      case "email":
        if (!value.trim()) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errors.email = "Please enter a valid email address (e.g., example@gmail.com)";
        } else {
            delete errors.email;
        }
        break;
        
      case "phone":
        if (!value.trim()) {
          errors.phone = "Phone number is required";
        } else if (!/^\+94\d{9}$/.test(value.replace(/\s/g, ''))) {
          errors.phone = "Must be in +94 format with 9 digits (e.g., +94771462980)";
        } else {
          if (value.startsWith('+94')) {
            setEditData(prev => ({
              ...prev,
              address: {
                ...prev.address,
                country: "Sri Lanka"
              }
            }));
            delete errors["address.country"];
          }
          delete errors.phone;
        }
        break;
        
      case "address.postalCode":
        if (!value.trim()) {
          errors["address.postalCode"] = "Postal code is required";
        } else if (!/^\d{5}$/.test(value)) {
          errors["address.postalCode"] = "Must be exactly 5 digits";
        } else {
          delete errors["address.postalCode"];
        }
        break;
        
      case "address.street":
        if (!value.trim()) {
          errors["address.street"] = "Street address is required";
        } else {
          delete errors["address.street"];
        }
        break;
        
      default:
        break;
    }
    
    setFieldErrors(errors);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone',
      'address.street', 'address.city', 'address.postalCode', 'address.country'
    ];
    
    requiredFields.forEach(field => {
      if (field.startsWith('address.')) {
        const addressField = field.split('.')[1];
        if (!editData.address[addressField]?.toString().trim()) {
          errors[field] = "This field is required";
          isValid = false;
        }
      } else if (!editData[field]?.toString().trim()) {
        errors[field] = "This field is required";
        isValid = false;
      }
    });

    setFieldErrors({ ...errors, ...fieldErrors });
    
    return isValid && Object.keys(fieldErrors).length === 0;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = localStorage.getItem('user');
        if (!userData) {
          navigate('/signin');
          return;
        }

        const { id } = JSON.parse(userData);
        const token = localStorage.getItem('token');
        
        const response = await axios.get(`${apiUrl}/auth/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(response.data);
        setPreviewImage(response.data.profilePicture ? `${apiUrl}/uploads/${response.data.profilePicture}` : '/default-profile.jpg');
        setEditData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phone: response.data.phone || '',
          address: {
            street: response.data.address?.street || '',
            city: response.data.address?.city || '',
            postalCode: response.data.address?.postalCode || '',
            country: response.data.address?.country || ''
          },
          profilePicture: null
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch user data');
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, apiUrl]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const userData = localStorage.getItem('user');
      const { id } = JSON.parse(userData);
      const token = localStorage.getItem('token');
  
      await axios.delete(`${apiUrl}/auth/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/signin', { 
        state: { 
          message: 'Your account has been deleted successfully' 
        } 
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete account');
      console.error('Error deleting user:', err);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setEditData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else {
      setEditData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    validateField(name, value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditData(prev => ({
        ...prev,
        profilePicture: file
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      setError("Please correct the errors in the form");
      return;
    }

    try {
      const userData = localStorage.getItem('user');
      const { id } = JSON.parse(userData);
      const token = localStorage.getItem('token');
  
      const formData = new FormData();
      formData.append('firstName', editData.firstName);
      formData.append('lastName', editData.lastName);
      formData.append('email', editData.email);
      formData.append('phone', editData.phone);
      formData.append('address[street]', editData.address.street);
      formData.append('address[city]', editData.address.city);
      formData.append('address[postalCode]', editData.address.postalCode);
      formData.append('address[country]', editData.address.country);
      
      if (editData.profilePicture) {
        formData.append('profilePicture', editData.profilePicture);
      }
  
      const response = await axios.put(`${apiUrl}/auth/users/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
  
      setUser(response.data);
      setIsEditing(false);
      if (response.data.profilePicture) {
        setPreviewImage(`${apiUrl}/uploads/${response.data.profilePicture}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
      console.error('Error updating profile:', err);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFieldErrors({});
    setEditData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || '',
      address: {
        street: user.address?.street || '',
        city: user.address?.city || '',
        postalCode: user.address?.postalCode || '',
        country: user.address?.country || ''
      },
      profilePicture: null
    });
    setPreviewImage(user.profilePicture ? `${apiUrl}/uploads/${user.profilePicture}` : '/default-profile.jpg');
  };

  const DeleteConfirmationModal = () => {
    if (!showDeleteModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 shadow-lg text-center">
          <div className="text-red-500 text-3xl mb-3">⚠️</div>
          <h2 className="text-lg font-bold mb-2">Confirm Deletion</h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete your account? This action cannot be undone.
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="px-4 py-2 border rounded hover:bg-gray-100"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete Account'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="w-full max-w-3xl p-4 text-center">Loading profile...</div>;
  }

  if (error) {
    return <div className="w-full max-w-3xl p-4 text-red-500 text-center">{error}</div>;
  }

  if (!user) {
    return <div className="w-full max-w-3xl p-4 text-center">No user data found</div>;
  }

  return (
    <div className="w-full max-w-3xl space-y-6">
      <DeleteConfirmationModal />

      {/* User Info */}
      <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={previewImage}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            {isEditing && (
              <div className="absolute bottom-0 right-0">
                <label className="cursor-pointer bg-blue-500 text-white p-1 rounded-full">
                  <Pencil size={14} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>
          <div>
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  name="firstName"
                  value={editData.firstName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`font-bold text-lg border rounded p-1 w-full ${
                    fieldErrors.firstName ? 'border-red-500' : ''
                  }`}
                />
                {fieldErrors.firstName && (
                  <p className="text-red-500 text-sm">{fieldErrors.firstName}</p>
                )}
                <input
                  type="text"
                  name="lastName"
                  value={editData.lastName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`font-bold text-lg border rounded p-1 w-full ${
                    fieldErrors.lastName ? 'border-red-500' : ''
                  }`}
                />
                {fieldErrors.lastName && (
                  <p className="text-red-500 text-sm">{fieldErrors.lastName}</p>
                )}
              </div>
            ) : (
              <h3 className="font-bold text-lg">{user.firstName} {user.lastName}</h3>
            )}
            {isEditing ? (
              <div className="flex space-x-2 mt-2">
                <div className="w-1/2">
                  <input
                    type="text"
                    name="address.city"
                    value={editData.address.city}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`border rounded p-1 w-full ${
                      fieldErrors["address.city"] ? 'border-red-500' : ''
                    }`}
                    placeholder="City"
                  />
                  {fieldErrors["address.city"] && (
                    <p className="text-red-500 text-sm">{fieldErrors["address.city"]}</p>
                  )}
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    name="address.country"
                    value={editData.address.country}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`border rounded p-1 w-full ${
                      fieldErrors["address.country"] ? 'border-red-500' : ''
                    }`}
                    placeholder="Country"
                  />
                  {fieldErrors["address.country"] && (
                    <p className="text-red-500 text-sm">{fieldErrors["address.country"]}</p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">
                {user.address?.city}, {user.address?.country}
              </p>
            )}
          </div>
        </div>
        {!isEditing && (
          <div className="flex space-x-2">
            <button 
              onClick={() => setIsEditing(true)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              aria-label="Edit profile"
            >
              <Pencil size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h4 className="font-semibold">Personal Information</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold">First Name:</span>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={editData.firstName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`border rounded p-1 ml-2 w-3/4 ${
                    fieldErrors.firstName ? 'border-red-500' : ''
                  }`}
                />
                {fieldErrors.firstName && (
                  <p className="text-red-500 text-sm ml-2">{fieldErrors.firstName}</p>
                )}
              </div>
            ) : (
              ` ${user.firstName}`
            )}
          </div>
          <div>
            <span className="font-semibold">Last Name:</span>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  name="lastName"
                  value={editData.lastName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`border rounded p-1 ml-2 w-3/4 ${
                    fieldErrors.lastName ? 'border-red-500' : ''
                  }`}
                />
                {fieldErrors.lastName && (
                  <p className="text-red-500 text-sm ml-2">{fieldErrors.lastName}</p>
                )}
              </div>
            ) : (
              ` ${user.lastName}`
            )}
          </div>
          <div>
            <span className="font-semibold">Email Address:</span>
            {isEditing ? (
              <div>
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`border rounded p-1 ml-2 w-3/4 ${
                    fieldErrors.email ? 'border-red-500' : ''
                  }`}
                />
                {fieldErrors.email && (
                  <p className="text-red-500 text-sm ml-2">{fieldErrors.email}</p>
                )}
              </div>
            ) : (
              ` ${user.email}`
            )}
          </div>
          <div>
            <span className="font-semibold">Phone Number:</span>
            {isEditing ? (
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={editData.phone}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`border rounded p-1 ml-2 w-3/4 ${
                    fieldErrors.phone ? 'border-red-500' : ''
                  }`}
                  placeholder="+94771462980"
                />
                {fieldErrors.phone && (
                  <p className="text-red-500 text-sm ml-2">{fieldErrors.phone}</p>
                )}
              </div>
            ) : (
              ` ${user.phone || 'Not provided'}`
            )}
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h4 className="font-semibold">Address</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold">Street:</span>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  name="address.street"
                  value={editData.address.street}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`border rounded p-1 ml-2 w-3/4 ${
                    fieldErrors["address.street"] ? 'border-red-500' : ''
                  }`}
                />
                {fieldErrors["address.street"] && (
                  <p className="text-red-500 text-sm ml-2">{fieldErrors["address.street"]}</p>
                )}
              </div>
            ) : (
              ` ${user.address?.street || 'Not provided'}`
            )}
          </div>
          <div>
            <span className="font-semibold">City:</span>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  name="address.city"
                  value={editData.address.city}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`border rounded p-1 ml-2 w-3/4 ${
                    fieldErrors["address.city"] ? 'border-red-500' : ''
                  }`}
                />
                {fieldErrors["address.city"] && (
                  <p className="text-red-500 text-sm ml-2">{fieldErrors["address.city"]}</p>
                )}
              </div>
            ) : (
              ` ${user.address?.city || 'Not provided'}`
            )}
          </div>
          <div>
            <span className="font-semibold">Postal Code:</span>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  name="address.postalCode"
                  value={editData.address.postalCode}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`border rounded p-1 ml-2 w-3/4 ${
                    fieldErrors["address.postalCode"] ? 'border-red-500' : ''
                  }`}
                  maxLength="5"
                />
                {fieldErrors["address.postalCode"] && (
                  <p className="text-red-500 text-sm ml-2">{fieldErrors["address.postalCode"]}</p>
                )}
              </div>
            ) : (
              ` ${user.address?.postalCode || 'Not provided'}`
            )}
          </div>
          <div>
            <span className="font-semibold">Country:</span>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  name="address.country"
                  value={editData.address.country}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`border rounded p-1 ml-2 w-3/4 ${
                    fieldErrors["address.country"] ? 'border-red-500' : ''
                  }`}
                />
                {fieldErrors["address.country"] && (
                  <p className="text-red-500 text-sm ml-2">{fieldErrors["address.country"]}</p>
                )}
              </div>
            ) : (
              ` ${user.address?.country || 'Not provided'}`
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {isEditing ? (
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          <div className="flex justify-end gap-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={Object.keys(fieldErrors).length > 0}
              className={`px-4 py-2 text-white rounded ${
                Object.keys(fieldErrors).length > 0 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-red-600">Danger Zone</h4>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-gray-600">
              Deleting your account will remove all your data permanently.
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              disabled={isDeleting}
              className="w-fit px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-red-300"
            >
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;