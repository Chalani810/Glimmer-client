import React, { useState, useEffect } from "react";
import Sidebar from "../component/AdminEvent/Sidebar";
import ProductTable from "../component/AdminProduct/ProductTable";
import ProductForm from "../component/AdminProduct/ProductForm";
import axios from "axios";

const AddProductPage = () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch all products
  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${apiUrl}/product/`); // Adjust endpoint as needed
      setProducts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch products");
      console.error("Error fetching products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle new product addition
  const handleAddProduct = async (newProduct) => {
    setIsLoading(true);
    setError(null);

    try {
      // Create FormData object for file upload
      const formData = new FormData();
      formData.append("pname", newProduct.pname);
      formData.append("stock", newProduct.stock);
      formData.append("pprice", newProduct.pprice);

      // Append each selected event
      newProduct.ename.forEach((event) => {
        formData.append("ename", event);
      });

      // Append image file if exists
      if (newProduct.productImage) {
        formData.append("productImage", newProduct.productImage);
      }

      if (!isEditMode) {
        const response = await axios.post(`${apiUrl}/product/add`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {

        const response = await axios.post(`${apiUrl}/product/add`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      // Refresh the product list after adding a new one
      await fetchProducts();
      setShowModal(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product");
      console.error("Error adding product:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) return;

    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(`${apiUrl}/product/delete/${productId}`);
      await fetchProducts(); // Refresh list after deletion
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete product");
      console.error("Error deleting product:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProduct = (productId) => {
    setEditProductId(productId);
    setIsEditMode(true);
    setShowModal(true);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content on the right */}
      <div className="flex-1 overflow-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">All Product List</h2>
          <button
            onClick={() => {
              setShowModal(true);
              setIsEditMode(false);
              setEditProductId(null);
            }}
            className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "+ New Product"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Loading Message */}
        {isLoading && !showModal && (
          <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
            Loading products...
          </div>
        )}

        {/* Product Table */}
        <ProductTable
          products={products}
          isLoading={isLoading}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />

        {/* Product Form Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-3 text-gray-600 text-2xl hover:text-red-600"
                disabled={isLoading}
              >
                &times;
              </button>
              <ProductForm
                onAddProduct={handleAddProduct}
                onCancel={() => setShowModal(false)}
                isLoading={isLoading}
                isEditMode={isEditMode}
                productId={editProductId}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProductPage;
