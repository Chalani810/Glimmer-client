import React, { useState, useEffect } from "react";
import { Trash, ChevronLeft, ChevronRight, Loader2, ToggleLeft, ToggleRight } from "lucide-react";
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
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1
  });

  const fetchUsers = async (page = 1, search = '') => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/auth/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          page,
          limit: pagination.limit,
          search
        }
      });
      
      setUsers(response.data.users);
      setPagination({
        ...pagination,
        page,
        total: response.data.pagination.total,
        pages: response.data.pagination.pages
      });
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/signin';
        return;
      }
      setError(error.response?.data?.message || 'Failed to fetch users');
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      fetchUsers(pagination.page, searchTerm);
    }, 5000);
  
    return () => clearInterval(refreshInterval);
  }, [pagination.page, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(1, searchTerm);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      fetchUsers(newPage, searchTerm);
    }
  };

  const handleToggleStatus = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${apiUrl}/auth/users/${userId}/toggle-status`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchUsers(pagination.page, searchTerm);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to toggle user status');
      console.error("Error toggling user status:", error);
    }
  };

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
      
      await fetchUsers(pagination.page, searchTerm);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/signin';
        return;
      }
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
        <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4 shadow-lg text-center">
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

  if (loading && users.length === 0) {
    return (
      <div className="p-6 text-center">
        <Loader2 className="animate-spin inline" /> Loading users...
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500 text-center">{error}</div>;
  }

  if (users.length === 0) {
    return <div className="p-6 text-center">No users found</div>;
  }

  return (
    <div className="p-4 md:p-6">
      <DeleteConfirmationModal />
      
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 flex-grow"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 whitespace-nowrap"
          >
            Search
          </button>
        </form>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft />
          </button>
          <span className="text-sm md:text-base">
            Page {pagination.page} of {pagination.pages}
          </span>
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.pages}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="p-3 md:p-4">User</th>
              <th className="p-3 md:p-4 hidden md:table-cell">User ID</th>
              <th className="p-3 md:p-4 hidden md:table-cell">Phone</th>
              <th className="p-3 md:p-4 hidden lg:table-cell">Address</th>
              <th className="p-3 md:p-4">Status</th>
              <th className="p-3 md:p-4 hidden sm:table-cell">Points</th>
              <th className="p-3 md:p-4 hidden md:table-cell">Date Added</th>
              <th className="p-3 md:p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-3 md:p-4 flex items-center space-x-3">
                  <img
                    src={user.profilePicture ? `${apiUrl}/uploads/${user.profilePicture}` : profileImg}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{`${user.firstName} ${user.lastName}`}</p>
                    <p className="text-sm text-gray-500 md:hidden">{user.userId || 'N/A'}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </td>
                <td className="p-3 md:p-4 hidden md:table-cell">{user.userId || 'N/A'}</td>
                <td className="p-3 md:p-4 hidden md:table-cell">{user.phone || 'Not provided'}</td>
                <td className="p-3 md:p-4 hidden lg:table-cell">
                  {user.address ? 
                    `${user.address.street || ''}, ${user.address.city || ''}`
                    : 'Not provided'}
                </td>
                <td className="p-3 md:p-4">
                  <button
                    onClick={() => handleToggleStatus(user._id)}
                    className="flex items-center gap-1"
                  >
                    {user.isActive ? (
                      <>
                        <ToggleRight className="text-green-500" />
                        <span className="hidden sm:inline text-green-700">Active</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="text-red-500" />
                        <span className="hidden sm:inline text-red-700">Inactive</span>
                      </>
                    )}
                  </button>
                </td>
                <td className="p-3 md:p-4 hidden sm:table-cell">{user.loyaltyPoints || 0}</td>
                <td className="p-3 md:p-4 hidden md:table-cell">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 md:p-4 text-right">
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
    </div>
  );
};

export default CustomerTable;