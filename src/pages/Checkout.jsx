// src/pages/CheckoutForm.jsx
import React, { useState } from "react";
import FormInput from "../component/Checkout/FormInput";
import ContactDropdown from "../component/Checkout/ContactDropdown";
import FileUpload from "../component/Checkout/FileUpload";

const CheckoutForm = () => {
  //State to manage the form data, including orderNumber and other customer details
  const [formData, setFormData] = useState({
    orderNumber: "ORD123456", // This would be dynamically generated from your backend
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    telephone: "",
    mobile: "",
    contactMethod: "call", // Defaulting to 'call'
    comment: "",
    totalAmount: "",
    advancePayment: "",
    slip: null, // Used for storing the uploaded bank slip/image
  });

  const [isSuccess, setIsSuccess] = useState(null); // Track success/failure message

  //Handle the change of values for form fields
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  //Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation checks
    if (!formData.firstName || !formData.lastName || !formData.email) {
        alert("Please fill in all required fields.");
        return;
      }
  
      // Check for advance payment and receipt upload if applicable
      if (formData.advancePayment && !formData.slip) {
        alert("Please upload the payment receipt.");
        return;
      }

      // Simulate successful submission
    setIsSuccess(true);

// Proceed with actual form submission (e.g., send data to the server)
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    // You can use fetch or axios to send the 'data' to your backend API
    console.log("Submitting form data:", formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Checkout Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Order Number - Displaying as a non-editable text */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Order Number</label>
          <p className="mt-1 text-base text-gray-900 bg-gray-100 p-2 rounded">{formData.orderNumber}</p>
        </div>

        {/* First Name */}
        <FormInput label="First Name" value={formData.firstName} onChange={(val) => handleChange("firstName", val)} />
        {/* Last Name */}
        <FormInput label="Last Name" value={formData.lastName} onChange={(val) => handleChange("lastName", val)} />
        {/* Email */}
        <FormInput label="Email" type="email" value={formData.email} onChange={(val) => handleChange("email", val)} />
        {/* Address */}
        <FormInput label="Address" value={formData.address} onChange={(val) => handleChange("address", val)} />
        {/* Telephone */}
        <FormInput label="Telephone" value={formData.telephone} onChange={(val) => handleChange("telephone", val)} />
        {/* Mobile */}
        <FormInput label="Mobile" value={formData.mobile} onChange={(val) => handleChange("mobile", val)} />
        {/* Preferred Contact Method */}
        <ContactDropdown value={formData.contactMethod} onChange={(val) => handleChange("contactMethod", val)} />
        {/* Comment */}
        <FormInput label="Comment" value={formData.comment} onChange={(val) => handleChange("comment", val)} />
        {/* Total Amount */}
        <FormInput label="Total Amount" value={formData.totalAmount} onChange={(val) => handleChange("totalAmount", val)} />

        {/* Advance Payment */}
        <FormInput label="Advance Payment" value={formData.advancePayment} onChange={(val) => handleChange("advancePayment", val)} />

        {/* File Upload (for uploading the receipt) */}
        <FileUpload onFileSelect={(file) => handleChange("slip", file)} />
        {/* Submit Button */}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
