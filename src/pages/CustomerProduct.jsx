import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:5000"; // Set your backend API base URL

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/product/`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const handleReadMore = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="bg-white">
      <header className="text-center py-10">
        <h1 className="text-4xl font-bold">Browse Our Products</h1>
        <p className="mt-4 text-gray-600">
          Find the perfect items for your event.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-10">
        {products
          .filter((product) => product.visibility !== false) // Only show visible products
          .map((product) => {
            const imageSrc = product.photoUrl
              ? `${apiUrl}/uploads/${product.photoUrl}`
              : "https://via.placeholder.com/400x300?text=Product+Image";
            const title = product.title || "Product Title";
            const price = product.price || "Price not available";
            const description =
              product.description ||
              "A brief description of the product goes here.";

            return (
              <div
                key={product._id}
                className="flex flex-col bg-gray-100 rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={product.photoUrl}
                  alt={product.pname}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 flex flex-col justify-between w-full">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{product.pname}</h2>
                    <p className="text-lg font-semibold text-gray-900 mb-4">
                      Rs. {product.pprice}
                    </p>
                  </div>
                  <button
                    onClick={() => handleReadMore(product._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-fit"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      <footer className="bg-red-500 text-white text-center p-4">
        <p>© 2025 Event Essentials Rental Management</p>
      </footer>
    </div>
  );
};

export default ProductPage;
