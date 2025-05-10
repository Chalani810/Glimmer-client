import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const SignUpForm = () => {
  const navigate = useNavigate();


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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

  /**
   * Validates a specific field based on its name and value
   * @param {string} name - Field name
   * @param {string} value - Field value
   */
  const validateField = (name, value) => {
    const errors = { ...fieldErrors };
    
    switch (name) {
      case "firstName":
      case "lastName":
      case "country":
        case "city":
          if (!value.trim()) {
            errors[name] = "This field is required";
          } else if (!/^[a-zA-Z0-9\s-]+$/.test(value)) {
            errors[name] = "Only alphanumeric characters, spaces and hyphens allowed";
          } else {
            delete errors[name];
          }
          break;
        
        case "email":
          if (!value.trim()) {
              errors.email = "Email is required";
          } else if (!/^[^\s@]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|icloud\.com)$/i.test(value)) {
              errors.email = "Please enter a valid email address from supported providers";
          } else {
              delete errors.email;
          }
            break;
        
        case "phone":
          if (!value.trim()) {
                errors.phone = "Phone number is required";
          } else if (!/^\+94\d{9}$/.test(value.replace(/\s/g, ''))) {
                errors.phone = "Must be in +94 format with 9 digits (e.g., +94771462980)";
          } else {
                // Auto-set country to Sri Lanka if phone starts with +94
          if (value.startsWith('+94')) {
                  setFormData(prev => ({
                    ...prev,
                    country: "Sri Lanka"
          }));
                  delete errors.country;
                }
                delete errors.phone;
              }
              break;
        
      case "postalCode":
        if (!value.trim()) {
          errors.postalCode = "Postal code is required";
        } else if (!/^\d{5}$/.test(value)) {
          errors.postalCode = "Must be exactly 5 digits";
        } else {
          delete errors.postalCode;
        }
        break;
        
      case "password":
        if (!value.trim()) {
          errors.password = "Password is required";
        } else if (value.length < 8) {
          errors.password = "Password must be at least 8 characters";
        } else {
          delete errors.password;
        }
        break;
        
      case "confirmPassword":
        if (!value.trim()) {
          errors.confirmPassword = "Please confirm your password";
        } else if (value !== formData.password) {
          errors.confirmPassword = "Passwords don't match";
        } else {
          delete errors.confirmPassword;
        }
        break;
        
      case "street":
        if (!value.trim()) {
          errors.street = "Street address is required";
        } else {
          delete errors.street;
        }
        break;
        
      default:
        break;
    }
    
    setFieldErrors(errors);
  };

  /**
   * Handles input changes and validates the field
   */
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const newValue = type === "checkbox" ? checked : type === "file" ? files[0] : value;
    
    setFormData({
      ...formData,
      [name]: newValue,
    });
    
    // Validate non-file and non-checkbox fields immediately
    if (type !== "file" && type !== "checkbox") {
      validateField(name, newValue);
    }
  };

  /**
   * Validates field when user moves away from it
   */
  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  /**
   * Validates the entire form before submission
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Check required fields
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'password',
      'confirmPassword', 'street', 'city', 'postalCode', 'country'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]?.toString().trim()) {
        errors[field] = "This field is required";
        isValid = false;
      }
    });

    // Check terms agreement
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = "You must agree to the Terms & Conditions and Privacy Policy to proceed";
      isValid = false;
    }

    // Merge with existing field errors
    setFieldErrors({ ...errors, ...fieldErrors });
    
    return isValid && Object.keys(fieldErrors).length === 0;
  };

  /**
   * Handles form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any browser autofill
    e.target.reset();
    
    if (!validateForm()) {
      setError("Please correct the errors in the form");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const data = new FormData();
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("phone", formData.phone);
      data.append("address[street]", formData.street);
      data.append("address[city]", formData.city);
      data.append("address[postalCode]", formData.postalCode);
      data.append("address[country]", formData.country);
  
      if (formData.profilePicture) {
        data.append("profilePicture", formData.profilePicture);
      }
  
      const response = await axios.post(`${apiUrl}/auth/register`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      navigate("/signin", { 
        state: { 
          success: "Registration successful! Please login.",
          email: formData.email 
        } 
      });
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.message || 
        err.message || 
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignInRedirect = () => {
    navigate("/signin");


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

      <h2 className="text-2xl font-bold mb-2 text-center">Get Started Now</h2>

      <p className="text-gray-500 text-center mb-6">
        Enter your credentials to create your account
      </p>


      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="block mb-1 font-semibold">First Name *</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full border rounded-md p-2 outline-none ${
                fieldErrors.firstName ? 'border-red-500' : 'focus:ring-2 focus:ring-red-400'
              }`}
              required
            />
            {fieldErrors.firstName && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-1 font-semibold">Last Name *</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full border rounded-md p-2 outline-none ${
                fieldErrors.lastName ? 'border-red-500' : 'focus:ring-2 focus:ring-red-400'
              }`}
              required
            />
            {fieldErrors.lastName && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.lastName}</p>
            )}
          </div>

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

          <label className="block mb-1 font-semibold">Email Address *</label>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full border rounded-md p-2 outline-none ${
              fieldErrors.email ? 'border-red-500' : 'focus:ring-2 focus:ring-red-400'
            }`}
            required
          />
          {fieldErrors.email && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
          )}

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

          <label className="block mb-1 font-semibold">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            placeholder="+94771462980"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full border rounded-md p-2 outline-none ${
              fieldErrors.phone ? 'border-red-500' : 'focus:ring-2 focus:ring-red-400'
            }`}
            required
          />
          {fieldErrors.phone && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.phone}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Password */}
          <div>
          <label className="block mb-1 font-semibold">Password *</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full border rounded-md p-2 outline-none ${
                fieldErrors.password ? 'border-red-500' : 'focus:ring-2 focus:ring-red-400'
              }`}
              required
              minLength="8"
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {fieldErrors.password && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>
          )}
        </div>

          {/* Confirm Password */}
          <div>
          <label className="block mb-1 font-semibold">Confirm Password *</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full border rounded-md p-2 outline-none ${
                fieldErrors.confirmPassword ? 'border-red-500' : 'focus:ring-2 focus:ring-red-400'
              }`}
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {fieldErrors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.confirmPassword}</p>
          )}
        </div>


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

          <label className="block mb-1 font-semibold">Street Address *</label>
          <input
            type="text"
            name="street"
            placeholder="Street and house number"
            value={formData.street}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full border rounded-md p-2 outline-none ${
              fieldErrors.street ? 'border-red-500' : 'focus:ring-2 focus:ring-red-400'
            }`}
            required
          />
          {fieldErrors.street && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.street}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* City */}
          <div>
            <label className="block mb-1 font-semibold">City *</label>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full border rounded-md p-2 outline-none ${
                fieldErrors.city ? 'border-red-500' : 'focus:ring-2 focus:ring-red-400'
              }`}
              required
            />
            {fieldErrors.city && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.city}</p>
            )}
          </div>

          {/* Postal Code */}
          <div>
            <label className="block mb-1 font-semibold">Postal Code *</label>
            <input
              type="text"
              name="postalCode"
              placeholder="eg:10230"
              value={formData.postalCode}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full border rounded-md p-2 outline-none ${
                fieldErrors.postalCode ? 'border-red-500' : 'focus:ring-2 focus:ring-red-400'
              }`}
              required
              maxLength="5"
            />
            {fieldErrors.postalCode && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.postalCode}</p>
            )}
          </div>

          {/* Country */}
          <div>
            <label className="block mb-1 font-semibold">Country *</label>
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full border rounded-md p-2 outline-none ${
                fieldErrors.country ? 'border-red-500' : 'focus:ring-2 focus:ring-red-400'
              }`}
              required
            />
            {fieldErrors.country && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.country}</p>
            )}
          </div>

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

          {formData.profilePicture && (
            <p className="text-sm text-gray-500 mt-1">
              Selected: {formData.profilePicture.name}
            </p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start">

        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center">

          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}

            className="mt-1 mr-2"

            className="mr-2"

            required
          />
          <p className="text-sm">
            I agree to the{" "}

            <a 
              href="/terms" 
              className="text-blue-600 underline" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a 
              href="/privacy" 
              className="text-blue-600 underline" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
          </p>
        </div>
        {fieldErrors.agreeToTerms && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.agreeToTerms}</p>
        )}

            <a href="/terms" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
              Terms & Conditions and Privacy Policy
            </a>
          </p>
        </div>


        {/* Sign Up Button */}
        <button
          type="submit"

          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-semibold transition duration-300 disabled:opacity-50"
          disabled={loading || Object.keys(fieldErrors).length > 0}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </span>
          ) : (
            "Sign Up"
          )}

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

            className="text-red-500 font-semibold hover:underline focus:outline-none"

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

export default SignUpForm;

