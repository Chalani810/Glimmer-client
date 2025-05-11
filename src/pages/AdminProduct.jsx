import React, { useState, useEffect } from "react";
import Sidebar from "../component/AdminEvent/Sidebar";
import ProductTable from "../component/AdminProduct/ProductTable";
import ProductForm from "../component/AdminProduct/ProductForm";
import ConfirmationModal from "../component/ConfirmationModal";
import axios from "axios";

const AddProductPage = () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${apiUrl}/product/`);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch products");
      console.error("Error fetching products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (newProduct) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("pname", newProduct.pname);
      formData.append("stock", newProduct.stock);
      formData.append("pprice", newProduct.pprice);
      newProduct.ename.forEach((event) => {
        formData.append("ename", event);
      });
      if (newProduct.productImage) {
        formData.append("productImage", newProduct.productImage);
      }

      await axios.post(`${apiUrl}/product/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchProducts();
      setShowModal(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product");
      console.error("Error adding product:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProduct = (productId) => {
    setEditProductId(productId);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDeleteRequest = (productId) => {
    setSelectedProductId(productId);
    setShowConfirmModal(true);
  };

  const handleDeleteConfirmed = async () => {
    setShowConfirmModal(false);
    if (!selectedProductId) return;

    setIsLoading(true);
    try {
      await axios.delete(`${apiUrl}/product/${selectedProductId}`);
      await fetchProducts();
      setSelectedProductId(null);
    } catch (err) {
      console.error("Error deleting product:", err);
      setError(err.response?.data?.message || "Failed to delete product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.pname.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto ml-0 md:ml-64"> {/* Responsive margin */}
        <div className="p-4 md:p-6"> {/* Responsive padding */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <h2 className="text-xl md:text-2xl font-bold">All Product List</h2>
            <button
              onClick={() => {
                setShowModal(true);
                setIsEditMode(false);
                setEditProductId(null);
              }}
              className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600 w-full md:w-auto"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "+ New Product"}
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Search Product"
              value={searchTerm}
              onChange={(e) => {
                const value = e.target.value;
                setSearchTerm(value);
                if (value.trim() === "") {
                  setFilteredProducts(products);
                }
              }}
              className="border p-2 rounded w-full"
            />
            <button
              className="border p-2 rounded bg-gray-200 hover:bg-gray-300 w-full md:w-auto"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
          )}

          {isLoading && !showModal && (
            <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
              Loading products...
            </div>
          )}

          <div className="overflow-x-auto">
            <ProductTable
              products={filteredProducts}
              isLoading={isLoading}
              onEdit={handleEditProduct}
              onDelete={handleDeleteRequest}
            />
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 relative">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-2 right-3 text-gray-600 text-2xl hover:text-red-600"
                  disabled={isLoading}
                >
                  ×
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

          <ConfirmationModal
            isOpen={showConfirmModal}
            onCancel={() => setShowConfirmModal(false)}
            onConfirm={handleDeleteConfirmed}
          />
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;