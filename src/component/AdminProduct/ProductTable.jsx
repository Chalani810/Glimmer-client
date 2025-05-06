import React from "react";
import { FaCamera, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";


const ProductTable = ({ products, isLoading, onEdit, fetchEventsForDelete }) => {
  const handleDelete = async (e, productId) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/product/${productId}`
      );
      console.log("Product deleted successfully:", response.data);
      fetchEventsForDelete(); // Refresh the list
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Photo</th>
            <th className="p-2 text-left">Product Name</th>
            <th className="p-2 text-left">Events</th>
            <th className="p-2 text-left">Stock</th>
            <th className="p-2 text-left">Price</th>
            <th className="p-2 text-left">Visibility</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => (
            <tr key={product._id || idx} className="border-t">
              {/* Photo */}
              <td className="p-2">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {product.photoUrl ? (
                    <img
                      src={product.photoUrl}
                      alt={product.pname}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <FaCamera className="text-gray-400" />
                  )}
                </div>
              </td>

              {/* Product Name */}
              <td className="p-2">{product.pname}</td>

              {/* Associated Events */}
              <td className="p-2">
                {Array.isArray(product.ename) && product.ename.length > 0
                  ? product.ename
                      .map(
                        (event) =>
                          event.charAt(0).toUpperCase() +
                          event.slice(1).toLowerCase()
                      )
                      .join(", ")
                  : "None"}
              </td>

              {/* Stock */}
              <td className="p-2">{product.stockqut}</td>

              {/* Price */}
              <td className="p-2 text-right pr-10">
                {product.pprice ? Number(product.pprice).toFixed(2) : "0.00"}
              </td>

              {/* Visibility */}
              <td className="p-2">
                <input
                  type="checkbox"
                  className="toggle toggle-sm"
                  checked={product.visibility}
                  readOnly
                />
              </td>

              {/* Actions */}
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => onEdit(product)}
                  className="text-blue-500 hover:text-blue-700"
                  aria-label="Edit Product"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={(e) => handleDelete(e, product._id)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Delete Product"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
