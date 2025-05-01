import React, { useState } from "react";
import FormInput from "../component/Checkout/FormInput";
import ContactDropdown from "../component/Checkout/ContactDropdown";
import FileUpload from "../component/Checkout/FileUpload";

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
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
  });

  const [isSuccess, setIsSuccess] = useState(null);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("Please fill in all required fields.");
      return;
    }

    if (formData.advancePayment && !formData.slip) {
      alert("Please upload the payment receipt.");
      return;
    }

    setIsSuccess(true);

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    console.log("Submitting form data:", formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Checkout Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Order Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Order Number
          </label>
          <p className="mt-1 text-base text-gray-900 bg-gray-100 p-2 rounded">
            {formData.orderNumber}
          </p>
        </div>

        {/* Required Fields */}
        <FormInput label="First Name" required value={formData.firstName} onChange={(val) => handleChange("firstName", val)} />
        <FormInput label="Last Name" required value={formData.lastName} onChange={(val) => handleChange("lastName", val)} />
        <FormInput label="Email" type="email" required value={formData.email} onChange={(val) => handleChange("email", val)} />

        {/* Optional Fields */}
        <FormInput label="Address" value={formData.address} onChange={(val) => handleChange("address", val)} />
        <FormInput label="Telephone" value={formData.telephone} onChange={(val) => handleChange("telephone", val)} />
        <FormInput label="Mobile" value={formData.mobile} onChange={(val) => handleChange("mobile", val)} />
        <ContactDropdown value={formData.contactMethod} onChange={(val) => handleChange("contactMethod", val)} />
        <FormInput label="Comment" value={formData.comment} onChange={(val) => handleChange("comment", val)} />
        <FormInput label="Total Amount" value={formData.totalAmount} onChange={(val) => handleChange("totalAmount", val)} />
        <FormInput label="Advance Payment" value={formData.advancePayment} onChange={(val) => handleChange("advancePayment", val)} />

        {/* File Upload */}
        <FileUpload onFileSelect={(file) => handleChange("slip", file)} />

        {/* Submit Button */}
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
