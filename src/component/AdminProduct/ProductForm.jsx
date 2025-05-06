import React, { useState,useEffect } from "react";

const ProductForm = ({ onAddProduct, onCancel, isLoading,isEditMode,productId }) => {
  const [productName, setProductName] = useState("");
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [stock, setStock] = useState();
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleEventChange = (eventName) => {
    if (selectedEvents.includes(eventName)) {
      setSelectedEvents(selectedEvents.filter((e) => e !== eventName));
    } else {
      setSelectedEvents([...selectedEvents, eventName]);
    }
  };

  useEffect(() => {
    if (productId && isEditMode) {
      setProductName(productId.pname || "");
      setStock(productId.stockqut || "");
      setSelectedEvents(productId.ename || []);
      setPrice(productId.pprice || "");
    }
  }, [productId, isEditMode]); // include dependencies
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      pname: productName,
      ename: selectedEvents,
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Add New Product</h2>

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
          required
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        {imageFile && (
          <p className="text-sm text-gray-500 mt-1">
            Selected: {imageFile.name}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Events</label>
        <div className="flex flex-col gap-1 border border-gray-300 rounded px-3 py-2">
          {["Wedding", "Birthday", "Corporate"].map((eventOption) => (
            <label key={eventOption} className="inline-flex items-center">
              <input
                type="checkbox"
                value={eventOption}
                checked={selectedEvents.includes(eventOption)}
                onChange={() => handleEventChange(eventOption)}
                className="mr-2"
              />
              {eventOption}
            </label>
          ))}
        </div>
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
          {isLoading ? "Saving..." : "Save Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;