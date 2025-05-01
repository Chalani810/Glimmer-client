import React, { useState } from "react";
import axios from "axios";
import FormInput from "../component/Checkout/FormInput";
import ContactDropdown from "../component/Checkout/ContactDropdown";
import FileUpload from "../component/Checkout/FileUpload";

const CheckoutForm = () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const [formData, setFormData] = useState({
    
    orderNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    telephone: "",
    mobile: "",
    contactMethod: "call",
    comment: "",
    totalAmount: "",
    advancePayment: "",
    slip: null, 
  });

  const [isSuccess, setIsSuccess] = useState(null); // success = true or false
  const [message, setMessage] = useState("");        // success or error message

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setIsSuccess(false);
      setMessage("Please fill in all required fields.");
      return;
    }
  
    // Create FormData object
    const formDataToSend = new FormData();
    
    // Append all fields to FormData
    formDataToSend.append('orderNumber', formData.orderNumber);
    formDataToSend.append('firstName', formData.firstName);
    formDataToSend.append('lastName', formData.lastName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('telephone', formData.telephone);
    formDataToSend.append('mobile', formData.mobile);
    formDataToSend.append('contactMethod', formData.contactMethod);
    formDataToSend.append('comment', formData.comment);
    formDataToSend.append('totalAmount', formData.totalAmount);
    formDataToSend.append('advancePayment', formData.advancePayment);
    
    // Append the file if it exists
    if (formData.slip) {
      formDataToSend.append('slip', formData.slip);
    }
  
    console.log("Sending form data:", Object.fromEntries(formDataToSend.entries()));
  
    try {
      const response = await axios.post(
        `${apiUrl}/checkout/add`,
        formDataToSend,
        { 
          headers: { 
            'Content-Type': 'multipart/form-data'  // Important for file uploads
          } 
        }
      );
  
      console.log("Server Response:", response.data);
      setIsSuccess(true);
      setMessage("Order submitted successfully!");
  
      setFormData({
        orderNumber: "",
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        telephone: "",
        mobile: "",
        contactMethod: "call",
        comment: "",
        totalAmount: "",
        advancePayment: "",
        slip: null,
      });
  
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSuccess(false);
      setMessage("Failed to submit order. Please try again.");
      
      if (error.response) {
        console.error("Server responded with:", error.response.data);
        console.error("Status code:", error.response.status);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Checkout Form</h2>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${isSuccess ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Order Number</label>
          <p className="mt-1 text-base text-gray-900 bg-gray-100 p-2 rounded">
            {formData.orderNumber}
          </p>
        </div>

        <FormInput label="First Name" required value={formData.firstName} onChange={(val) => handleChange("firstName", val)} />
        <FormInput label="Last Name" required value={formData.lastName} onChange={(val) => handleChange("lastName", val)} />
        <FormInput label="Email" type="email" required value={formData.email} onChange={(val) => handleChange("email", val)} />

        <FormInput label="Address" value={formData.address} onChange={(val) => handleChange("address", val)} />
        <FormInput label="Telephone" value={formData.telephone} onChange={(val) => handleChange("telephone", val)} />
        <FormInput label="Mobile" value={formData.mobile} onChange={(val) => handleChange("mobile", val)} />
        <ContactDropdown value={formData.contactMethod} onChange={(val) => handleChange("contactMethod", val)} />
        <FormInput label="Comment" value={formData.comment} onChange={(val) => handleChange("comment", val)} />
        <FormInput label="Total Amount" value={formData.totalAmount} onChange={(val) => handleChange("totalAmount", val)} />
        <FormInput label="Advance Payment" value={formData.advancePayment} onChange={(val) => handleChange("advancePayment", val)} />

        {/* File Upload */}
        <FileUpload onFileSelect={(file) => handleChange("slip", file)} />

        <div className="flex justify-end gap-4">
          <button
            type="reset"
            onClick={() =>
              setFormData({
                orderNumber: "ORD123456",
                firstName: "",
                lastName: "",
                email: "",
                address: "",
                telephone: "",
                mobile: "",
                contactMethod: "call",
                comment: "",
                totalAmount: "",
                advancePayment: "",
                slip: null,
              })
            }
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Clear
          </button>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Submit Order
        </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
