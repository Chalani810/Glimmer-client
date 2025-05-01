import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
    profilePicture: null,
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const validateForm = () => {
    // Email address format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    // Phone number format
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("Please enter a valid phone number with country code.");
      return false;
    }

    // Password policy
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return false;
    }

    // Confirm password by re-entering
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }

    // Terms & Conditions agreement
    if (!formData.agreeToTerms) {
      alert("You must agree to the terms and privacy policy.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Normally you would send formData to the backend here
    console.log(formData);

    // Clear form or redirect after successful signup
  };

  const handleSignInRedirect = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-center">Get started now</h2>
      <p className="text-gray-500 text-center mb-6">
        Enter your credentials to create your account
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* First Name */}
        <div>
          <label className="block mb-1 font-semibold">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-red-400"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block mb-1 font-semibold">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-red-400"
            required
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block mb-1 font-semibold">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-red-400"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block mb-1 font-semibold">Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="+1 234 567 890"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-red-400"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-red-400"
            required
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-1 font-semibold">Re-enter Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-red-400"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1 font-semibold">Address</label>
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
            className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-red-400"
            required
          />
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal / Zip Code"
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-red-400"
            required
          />
        </div>

        <div>
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-red-400"
            required
          />
        </div>

        {/* User Profile Picture */}
        <div>
          <label className="block mb-1 font-semibold">Profile Picture</label>
          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="mr-2"
            required
          />
          <p className="text-sm">
            I agree to the{" "}
            <a href="/terms" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
              Terms & Conditions and Privacy Policy
            </a>
          </p>
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-semibold transition duration-300"
        >
          Sign Up
        </button>

        {/* Sign In Link */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <button
            type="button"
            onClick={handleSignInRedirect}
            className="text-red-500 font-semibold hover:underline"
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
