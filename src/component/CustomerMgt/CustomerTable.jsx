import React, { useState, useEffect } from "react";
import { Trash } from "lucide-react";
import profileImg from "../CustomerProfile/CustomerMgtProfile.jpg";
import axios from "axios";

const CustomerTable = () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/auth/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch users');
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;

    try {
      setIsDeleting(true);
      const token = localStorage.getItem('token');
      await axios.delete(`${apiUrl}/auth/users/${userToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Refresh the user list after successful deletion
      await fetchUsers();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete user');
      console.error("Error deleting user:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const DeleteConfirmationModal = () => {
    if (!showDeleteModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 shadow-lg text-center">
          <div className="text-red-500 text-3xl mb-3">⚠️</div>
          <h2 className="text-lg font-bold mb-2">Confirm Deletion</h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this user? This action cannot be undone.
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="px-4 py-2 border rounded hover:bg-gray-100"
              onClick={() => {
                setShowDeleteModal(false);
                setUserToDelete(null);
              }}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="p-6 text-center">Loading users...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500 text-center">{error}</div>;
  }

  if (users.length === 0) {
    return <div className="p-6 text-center">No users found</div>;
  }

  return (
    <div className="overflow-x-auto p-6">
      <DeleteConfirmationModal />
      
      <table className="min-w-full table-auto bg-white rounded-lg shadow">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="p-4">User Details</th>
            <th className="p-4">User ID</th>
            <th className="p-4">Phone Number</th>
            <th className="p-4">Address</th>
            <th className="p-4">Date Added</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b hover:bg-gray-50">
              <td className="p-4 flex items-center space-x-3">
                <img
                  src={user.profilePicture ? `${apiUrl}/uploads/${user.profilePicture}` : profileImg}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </td>
              <td className="p-4 text-sm text-gray-600">
                {user.userId || user._id.substring(0, 8) + '...'}
              </td>
              <td className="p-4">
                {user.phone || 'Not provided'}
              </td>
              <td className="p-4">
                {user.address ? 
                  `${user.address.street || ''}, ${user.address.city || ''}, ${user.address.postalCode || ''}, ${user.address.country || ''}`
                  : 'Not provided'}
              </td>
              <td className="p-4 text-sm">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="p-4 text-right">
                <button
                  onClick={() => handleDeleteClick(user._id)}
                  className="text-red-500 hover:text-red-700"
                  disabled={isDeleting}
                >
                  <Trash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;