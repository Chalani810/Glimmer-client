import React, { useState, useEffect } from "react";
import { FiSearch, FiShoppingCart, FiUser, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import authEvents from "../utils/authEvents";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in when component mounts
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }

    const handleLogin = (userData) => {
      setIsLoggedIn(true);
      setUser(userData);
    };

    authEvents.on('login', handleLogin);

    // Clean up the event listener when component unmounts
    return () => {
      authEvents.off('login', handleLogin);

    };
  }, []);

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  const handleLogout = () => {
    // Clear user data from storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Update state
    setIsLoggedIn(false);
    setUser(null);
    setShowProfileMenu(false);
    // Redirect to home page
    navigate("/home");
  };

  return (
    <header className="bg-white shadow-sm py-4 px-8 flex items-center justify-between relative">
      {/* Left: Logo */}
      <div className="text-2xl font-extrabold">
        <span className="text-black">Gli</span>
        <span className="text-red-600">mm</span>
        <span className="text-black">er</span>
      </div>

      {/* Center: Navigation */}
      <nav className="space-x-8 font-semibold hidden md:flex">
        <Link to="/home" className="text-red-600">
          Home
        </Link>
        <a href="#" className="text-black hover:text-red-600">
          About Us
        </a>
        <a href="#" className="text-black hover:text-red-600">
          Events
        </a>
        <a href="#" className="text-black hover:text-red-600">
          Contact Us
        </a>
        {isLoggedIn && (
          <Link to="/order-history" className="text-black hover:text-red-600">
            Order History
          </Link>
        )}
      </nav>

      {/* Right: Icons & Buttons */}
      <div className="flex items-center space-x-4">
        {/* Search input smoothly expanding */}
        <div className="flex items-center border border-gray-300 rounded-full px-2 transition-all duration-300 ease-in-out">
          <FiSearch
            className="text-2xl cursor-pointer"
            onClick={toggleSearch}
          />
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

        {/* Conditional rendering based on login status */}
        {!isLoggedIn ? (
          <>
            <Link to="/signup">
              <button className="bg-white px-4 py-1 rounded-full shadow text-sm font-medium hover:shadow-md">
                Sign Up
              </button>
            </Link>
            <Link to="/signin">
              <button className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-red-700">
                Sign In
              </button>
            </Link>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              {user?.profilePicture ? (
                <img
                  src={`${process.env.REACT_APP_API_URL}/uploads/${user.profilePicture}`}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <FiUser className="text-gray-600" />
              )}
            </button>

            {/* Profile dropdown menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                  to="/customerprofile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
