import React from "react";
import { FaCamera, FaEdit, FaTrash } from "react-icons/fa";

const ProductTable = ({ products, isLoading, onEdit, onDelete }) => {
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
          {products.map((product) => (
            <tr key={product._id} className="border-t">
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
              <td className="p-2">{product.pname}</td>
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
              <td className="p-2">{product.stockqut}</td>
              <td className="p-2 text-right pr-10">
                {product.pprice ? Number(product.pprice).toFixed(2) : "0.00"}
              </td>
              <td className="p-2">
                <input
                  type="checkbox"
                  className="toggle toggle-sm"
                  checked={product.visibility}
                  readOnly
                />
              </td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => onEdit(product._id)}
                  className="text-blue-500 hover:text-blue-700"
                  aria-label="Edit Product"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(product._id)}
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

