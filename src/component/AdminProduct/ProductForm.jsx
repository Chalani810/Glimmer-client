import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ProductForm = ({ onAddProduct, onCancel, isLoading, isEditMode, productId }) => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const [productName, setProductName] = useState("");
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [stock, setStock] = useState(50);
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [events, setEvents] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  console.log(productId);
  
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleEventChange = (eventId) => {
    setSelectedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId) 
        : [...prev, eventId]
    );
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${apiUrl}/event`);
        setEvents(response.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
    
    if (productId && isEditMode) {
      setProductName(productId.pname || "");
      setStock(productId.stockqut || "");
      setSelectedEvents(productId.ename || []);
      setPrice(productId.pprice || "");
    }
  }, [productId, isEditMode, apiUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      pname: productName,
      events: selectedEvents, 
      stock,
      pprice: price,
      productImage: imageFile,
    };

    onAddProduct(newProduct);
    
    // Clear form fields after submit
    setProductName("");
    setSelectedEvents([]);
    setStock("");
    setPrice("");
    setImageFile(null);
  };

  const getSelectedEventTitles = () => {
    return events
      .filter(event => selectedEvents.includes(event._id))
      .map(event => event.title)
      .join(", ");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        {isEditMode ? "Edit Product" : "Add New Product"}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          required={!isEditMode}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        {imageFile && (
          <p className="text-sm text-gray-500 mt-1">
            Selected: {imageFile.name}
          </p>
        )}
      </div>

      <div className="relative" ref={dropdownRef}>
        <label className="block text-sm font-medium text-gray-700 mb-1">Events</label>
        <div 
          className="w-full px-3 py-2 border border-gray-300 rounded cursor-pointer"
          onClick={toggleDropdown}
        >
          {selectedEvents.length > 0 ? getSelectedEventTitles() : "Select events..."}
        </div>
        
        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
            {events.map((event) => (
              <div 
                key={event._id} 
                className={`px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center ${
                  selectedEvents.includes(event._id) ? 'bg-blue-50' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEventChange(event._id);
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedEvents.includes(event._id)}
                  readOnly
                  className="mr-2 pointer-events-none"
                />
                <span>{event.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
        <input
          type="number"
          min="50"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="E.g., 1000.00"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : isEditMode ? "Update Product" : "Save Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;