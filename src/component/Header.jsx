import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiShoppingCart } from "react-icons/fi";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  return (
    <header className="bg-white shadow-sm py-4 px-8 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="text-2xl font-extrabold">
        <span className="text-black">Gli</span>
        <span className="text-red-600">mm</span>
        <span className="text-black">er</span>
      </div>

      {/* Center: Navigation */}
      <nav className="space-x-8 font-semibold hidden md:flex">
      <Link to="/home" className="text-black hover:text-red-600">Home</Link> {/*Home Page naviagtion */}
      <Link to="/AboutUs" className="text-black hover:text-red-600">About Us</Link>
        <a href="#" className="text-black hover:text-red-600">Events</a>
        <a href="#" className="text-black hover:text-red-600">Contact Us</a>
      </nav>

      {/* Right: Icons & Buttons */}
      <div className="flex items-center space-x-4">
        
        {/* Search input smoothly expanding */}
        <div className="flex items-center border border-gray-300 rounded-full px-2 transition-all duration-300 ease-in-out">
          <FiSearch
            className="text-2xl cursor-pointer"
            onClick={toggleSearch}
          />
          {/* Show input if search is active */}
          {showSearch && (
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="ml-2 outline-none w-40 transition-all duration-300"
            />
          )}
        </div>

        {/* Cart Icon */}
        <div className="relative">
          <Link to="/cart">
            <FiShoppingCart className="text-2xl" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full"></span>
          </Link>
        </div>

        <Link to="/signup">
          <button className="bg-white px-4 py-1 rounded-full shadow text-sm font-medium hover:shadow-md">
            Sign Up
          </button>
        </Link>
        
        <button className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-red-700">
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
