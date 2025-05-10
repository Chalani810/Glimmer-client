import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Reset form when component mounts
  useEffect(() => {
    setFormData({
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
  }, []);

 // Auto-populate country when phone starts with +94
 useEffect(() => {
  if (formData.phone.startsWith("+94")) {
    setFormData(prev => ({ ...prev, country: "Sri Lanka" }));
  }
}, [formData.phone]);

const handleChange = (e) => {
  const { name, value, type, checked, files } = e.target;
  
  // Validate field as user types
  validateField(name, type === "checkbox" ? checked : type === "file" ? files[0] : value);

  setFormData({
    ...formData,
    [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
  });
};

const validateField = (fieldName, value) => {
  const errors = { ...fieldErrors };
  
  switch (fieldName) {
    case "firstName":
    case "lastName":
      if (!/^[A-Za-z]+$/.test(value)) {
        errors[fieldName] = "Only alphabetical characters are allowed";
      } else {
        delete errors[fieldName];
      }
      break;
      
    case "email":
      if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)) {
        errors.email = "Please enter a valid Gmail address";
      } else {
        delete errors.email;
      }
      break;
      
    case "phone":
      if (!/^\+94\d{9}$/.test(value)) {
        errors.phone = "Please enter a valid Sri Lankan phone number (+94 followed by 9 digits)";
      } else {
        delete errors.phone;
      }
      break;
      
    case "password":
      if (value.length < 8) {
        errors.password = "Password must be at least 8 characters";
      } else {
        delete errors.password;
      }
      // Also validate confirm password if it exists
      if (formData.confirmPassword) {
        validateField("confirmPassword", formData.confirmPassword);
      }
      break;
      
    case "confirmPassword":
      if (value !== formData.password) {
        errors.confirmPassword = "Passwords do not match";
      } else {
        delete errors.confirmPassword;
      }
      break;
      
    case "postalCode":
      if (!/^\d{5}$/.test(value)) {
        errors.postalCode = "Postal code must be exactly 5 digits";
      } else {
        delete errors.postalCode;
      }
      break;
      
    case "agreeToTerms":
      if (!value) {
        errors.agreeToTerms = "You must agree to the terms";
      } else {
        delete errors.agreeToTerms;
      }
      break;
      
    default:
      // Required field validation
      if (typeof value === "string" && !value.trim() && fieldName !== "profilePicture") {
        errors[fieldName] = "This field is required";
      } else if (fieldName !== "profilePicture") {
        delete errors[fieldName];
      }
  }
  
  setFieldErrors(errors);
};

const validateForm = async () => {
  const errors = {};
  
  // Validate all fields
  Object.keys(formData).forEach(field => {
    validateField(field, formData[field]);
  });
  
  setFieldErrors(errors);
  
  // Check for duplicate user
  try {
    const response = await axios.get(`${apiUrl}/auth/check-user`, {
      params: {
        email: formData.email,
        phone: formData.phone
      }
    });
    
    if (response.data.exists) {
      setError("It looks like you've already registered. Please sign in.");
      return false;
    }
  } catch (err) {
    console.error("Error checking user:", err);
    setError("Error validating user information. Please try again.");
    return false;
  }
  
  return Object.keys(errors).length === 0;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  
  const isValid = await validateForm();
  if (!isValid) return;

  setLoading(true);
  setError(null);

  try {
    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("phone", formData.phone);
    data.append("street", formData.street);
    data.append("city", formData.city);
    data.append("postalCode", formData.postalCode);
    data.append("country", formData.country);
    if (formData.profilePicture) {
      data.append("profilePicture", formData.profilePicture);
    }

    await axios.post(`${apiUrl}/auth/register`, data, {
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
    if (err.response?.data?.message?.includes("already exists")) {
      setError("It looks like you've already registered. Please sign in.");
    } else {
      setError(err.response?.data?.message || 
        err.message || 
        "Registration failed. Please try again."
      );
    }
  } finally {
    setLoading(false);
  }
};

const isFormValid = () => {
  // Check if there are any field errors
  if (Object.keys(fieldErrors).length > 0) return false;

  // Check required fields (excluding profilePicture which is optional)
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'password',
    'confirmPassword',
    'street',
    'city',
    'postalCode',
    'country',
    'agreeToTerms'
  ];

  return requiredFields.every(field => {
    const value = formData[field];
    return typeof value === 'boolean' ? value : value && value.toString().trim();
  });
};

const handleSignInRedirect = () => {
  navigate("/signin");
};
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
      <h2 className="text-2xl font-bold mb-2 text-center">Get Started Now</h2>
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
            onBlur={(e) => validateField("firstName", e.target.value)}
            className={`w-full border rounded-md p-2 outline-none focus:ring-2 ${fieldErrors.firstName ? 'border-red-500 focus:ring-red-400' : 'focus:ring-red-400'}`}
            required
            pattern="[A-Za-z]+"
            title="Only alphabetic characters are allowed"
          />
          {fieldErrors.firstName && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.firstName}</p>
          )}
            className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-red-400"
            required
          />
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
            onBlur={(e) => validateField("lastName", e.target.value)}
            className={`w-full border rounded-md p-2 outline-none focus:ring-2 ${fieldErrors.lastName ? 'border-red-500 focus:ring-red-400' : 'focus:ring-red-400'}`}
            required
            pattern="[A-Za-z]+"
            title="Only alphabetic characters are allowed"
          />
          {fieldErrors.lastName && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.lastName}</p>
          )}
        </div>
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
          onBlur={(e) => validateField("email", e.target.value)}
          className={`w-full border rounded-md p-2 outline-none focus:ring-2 ${fieldErrors.email ? 'border-red-500 focus:ring-red-400' : 'focus:ring-red-400'}`}
          required
        />
        {fieldErrors.email && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label className="block mb-1 font-semibold">Phone Number *</label>
        <input
          type="tel"
          name="phone"
          placeholder="+94771234567"
          value={formData.phone}
          onChange={handleChange}
          onBlur={(e) => validateField("phone", e.target.value)}
          className={`w-full border rounded-md p-2 outline-none focus:ring-2 ${fieldErrors.phone ? 'border-red-500 focus:ring-red-400' : 'focus:ring-red-400'}`}
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
          <input
            type="password"
            name="password"
            placeholder="Create a password (min 8 chars)"
            value={formData.password}
            onChange={handleChange}
            onBlur={(e) => validateField("password", e.target.value)}
            className={`w-full border rounded-md p-2 outline-none focus:ring-2 ${fieldErrors.password ? 'border-red-500 focus:ring-red-400' : 'focus:ring-red-400'}`}
            required
            minLength="8"
          />
          {fieldErrors.password && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>
          )}

        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-1 font-semibold">Confirm Password *</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={(e) => validateField("confirmPassword", e.target.value)}
            className={`w-full border rounded-md p-2 outline-none focus:ring-2 ${fieldErrors.confirmPassword ? 'border-red-500 focus:ring-red-400' : 'focus:ring-red-400'}`}
            required
          />
          {fieldErrors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.confirmPassword}</p>
          )}
        </div>
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
          onBlur={(e) => validateField("street", e.target.value)}
          className={`w-full border rounded-md p-2 outline-none focus:ring-2 ${fieldErrors.street ? 'border-red-500 focus:ring-red-400' : 'focus:ring-red-400'}`}
          required
        />
        {fieldErrors.street && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.street}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-1 font-semibold">City *</label>

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            onBlur={(e) => validateField("city", e.target.value)}
            className={`w-full border rounded-md p-2 outline-none focus:ring-2 ${fieldErrors.city ? 'border-red-500 focus:ring-red-400' : 'focus:ring-red-400'}`}
            required
          />
          {fieldErrors.city && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.city}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-semibold">Postal Code *</label>
          <input
            type="text"
            name="postalCode"
            placeholder="10230"
            value={formData.postalCode}
            onChange={handleChange}
            onBlur={(e) => validateField("postalCode", e.target.value)}
            className={`w-full border rounded-md p-2 outline-none focus:ring-2 ${fieldErrors.postalCode ? 'border-red-500 focus:ring-red-400' : 'focus:ring-red-400'}`}
            required
            pattern="\d{5}"
            title="Must be exactly 5 digits"
          />
          {fieldErrors.postalCode && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.postalCode}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-semibold">Country *</label>
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            onBlur={(e) => validateField("country", e.target.value)}
            className={`w-full border rounded-md p-2 outline-none focus:ring-2 ${fieldErrors.country ? 'border-red-500 focus:ring-red-400' : 'focus:ring-red-400'}`}
            required
          />
          {fieldErrors.country && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.country}</p>
          )}
        </div>
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
        <input
          type="checkbox"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleChange}
          onBlur={(e) => validateField("agreeToTerms", e.target.checked)}
          className={`mt-1 mr-2 ${fieldErrors.agreeToTerms ? 'border-red-500' : ''}`}
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
        {fieldErrors.agreeToTerms && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.agreeToTerms}</p>
        )}
      </div>

      {/* Sign Up Button */}
      <button
        type="submit"
        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-semibold transition duration-300 disabled:opacity-50"
        disabled={loading || !isFormValid()}
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
      </button>

      {/* Sign In Link */}
      <p className="text-center text-sm mt-4">
        Already have an account?{" "}
        <button
          type="button"
          onClick={handleSignInRedirect}
          className="text-red-500 font-semibold hover:underline focus:outline-none"
        >
          Sign In
        </button>
      </p>
    </form>
  </div>
);
};

export default SignUpForm;

