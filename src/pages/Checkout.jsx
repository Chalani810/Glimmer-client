import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useCart } from "../CartContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AiOutlineDownload } from "react-icons/ai";
import { FaFileDownload } from "react-icons/fa";
import { jsPDF } from "jspdf";

const CheckoutForm = () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const userData = JSON.parse(localStorage.getItem("user"));
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: "",
    orderNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    telephone: "",
    mobile: "",
    contactMethod: "call",
    guestCount: "less than 100",
    eventDate: null,
    comment: "",
    cartTotal: 0,
    advancePayment: 0,
    duepayment: 0,
    slipUrl: null,
    slipPreview: null,
  });

  const [isSuccess, setIsSuccess] = useState(null);
  const [message, setMessage] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const datePickerRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // First fetch the cart data
        const cartResponse = await axios.get(`${apiUrl}/cart/${userData.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCart(cartResponse.data.data);

        // Then fetch user data
        const token = localStorage.getItem("token");
        if (token) {
          const userResponse = await fetch(`${apiUrl}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const userData = await userResponse.json();

          if (!userResponse.ok) {
            throw new Error(userData.message || "Failed to fetch user details");
          }

          // Now set the form data with both cart and user data
          setFormData({
            userId: userData._id || "",
            orderNumber: "",
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            email: userData.email || "",
            address: userData.address
              ? `${userData.address.street || ""}, ${
                  userData.address.city || ""
                }, ${userData.address.postalCode || ""}, ${
                  userData.address.country || ""
                }`
              : "",
            telephone: "",
            mobile: userData.phone || "",
            contactMethod: "call",
            guestCount: "less than 100",
            eventDate: null,
            comment: "",
            cartTotal: cartResponse.data.data?.cartTotal || 0,
            advancePayment: cartResponse.data.data?.advancePayment || 0,
            duepayment: cartResponse.data.data?.totalDue || 0,
            slipUrl: null,
            slipPreview: null,
            cart: cartResponse.data.data,
          });
        }
      } catch (error) {
        console.error("Failed to load data:", error);
        setMessage("Failed to load data. Please try again.");
      }
    };

    loadData();
  }, [apiUrl, userData.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, eventDate: date }));
    setIsCalendarOpen(false);
  };

  const toggleCalendar = () => {
    setIsCalendarOpen((prev) => !prev);
    if (!isCalendarOpen && datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null;
      setFormData((prev) => ({ ...prev, slipUrl: file, slipPreview: preview }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.mobile) {
      setIsSuccess(false);
      setMessage("Mobile number is required");
      return;
    }
    if (!formData.userId) {
      setIsSuccess(false);
      setMessage("User ID is not fetched. Please refresh.");
      return;
    }
    if (!formData.eventDate) {
      setIsSuccess(false);
      setMessage("Event date is required");
      return;
    }

    const phoneRegex = /^\d{10}$/;
    const slPhoneRegex = /^\+94\d{9}$/;

    if (!formData.mobile.trim()) {
      setIsSuccess(false);
      setMessage("Mobile number is required.");
      return;
    } else if (!slPhoneRegex.test(formData.mobile)) {
      setIsSuccess(false);
      setMessage(
        "Please enter a valid Sri Lankan mobile number (+94 followed by 9 digits)."
      );
      return;
    }

    if (formData.telephone && !phoneRegex.test(formData.telephone)) {
      setIsSuccess(false);
      setMessage("Please enter a valid 10-digit telephone number.");
      return;
    }

    const formDataToSend = new FormData();

    formDataToSend.append("userId", formData.userId);
    formDataToSend.append("orderNumber", formData.orderNumber);
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("telephone", formData.telephone);
    formDataToSend.append("eventDate", formData.eventDate);
    formDataToSend.append("mobile", formData.mobile);
    formDataToSend.append("contactMethod", formData.contactMethod);
    formDataToSend.append("guestCount", formData.guestCount);
    formDataToSend.append("comment", formData.comment);
    formDataToSend.append("cartTotal", formData.cartTotal.toString());
    formDataToSend.append("advancePayment", formData.advancePayment.toString());
    formDataToSend.append("duepayment", formData.duepayment.toString());
    formDataToSend.append("cart", JSON.stringify(formData.cart));

    if (formData.slipUrl) {
      formDataToSend.append("slip", formData.slipUrl);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/checkout/add`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to submit order");

      setIsSuccess(true);
      setMessage("Order submitted successfully!");
      setOrderSubmitted(true);

      setFormData((prev) => ({
        ...prev,
        address: "",
        telephone: "",
        mobile: "",
        contactMethod: "call",
        guestCount: "less than 100",
        eventDate: null,
        comment: "",
        slipUrl: null,
        slipPreview: null,
      }));
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSuccess(false);
      setMessage(error.message || "Failed to submit order. Please try again.");
    }
  };
  const generateInvoice = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 0, 0);
    doc.text("Glimmer", 105, 20, null, null, "center");

    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text("Invoice | Flower Road, Colombo 7", 105, 35, null, null, "center");

    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(12);
    doc.text(`Date: ${currentDate}`, 10, 40);

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.rect(10, 60, 190, 120);

    doc.setFontSize(12);
    let y = 70;

    doc.text("Item", 15, y);
    doc.text("Quantity", 105, y);
    doc.text("Amount", 170, y);
    y += 8;

    cart.items.forEach((item) => {
      doc.text(item.productId?.pname || "Product", 15, y);
      doc.text(`${item.quantity}`, 105, y, null, null, "center");
      doc.text(
        `Rs.${(item.quantity * item.price).toFixed(2)}`,
        170,
        y,
        null,
        null,
        "right"
      );
      y += 8;
    });

    doc.text(
      `Total Amount: Rs.${cart.cartTotal.toFixed(2)}`,
      170,
      y,
      null,
      null,
      "right"
    );
    doc.text(
      `Advance Payment: Rs.${cart.advancePayment.toFixed(2)}`,
      170,
      y + 10,
      null,
      null,
      "right"
    );
    doc.text(
      `Total Due: Rs.${cart.totalDue.toFixed(2)}`,
      170,
      y + 20,
      null,
      null,
      "right"
    );

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Bank Details:", 10, y + 40);
    doc.setFont("helvetica", "normal");
    doc.text("Account No: 200067834", 10, y + 48);
    doc.text("Account Name: Glimmer", 10, y + 56);
    doc.text("Branch: Colombo 7", 10, y + 64);
    doc.text("Bank: Commercial Bank", 10, y + 72);
    doc.text("Email: thathsaraniwijesinghe2001@gmail.com", 10, y + 80);

    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 100, 100);
    doc.text(
      "Thank you for your purchase!",
      105,
      y + 108,
      null,
      null,
      "center"
    );

    doc.save("invoice.pdf");
  };

  if (orderSubmitted && isSuccess) {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200 my-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <FaCheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="mt-3 text-2xl font-bold text-gray-900">
            Order Submitted Successfully!
          </h2>

          <div className="mt-4 p-4 bg-green-50 rounded-lg text-green-700">
            <p className="text-lg">{message}</p>
            <p className="mt-2 text-sm">
              We've received your order and will contact you shortly.
            </p>
          </div>
          <div
            onClick={generateInvoice}
            className="flex flex-col items-center cursor-pointer text-green-600 hover:text-green-800 m-4"
          >
            <FaFileDownload className="w-6 h-6" />
            <span className="text-sm mt-1">Download Invoice</span>
          </div>
          <div className="mt-6">
            <button
              onClick={() => navigate(`/customerviewevent`)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Place Another Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200 my-8 text-center">
        <div className="text-xl font-semibold text-gray-700 mb-4">
          Your cart is empty
        </div>
        <p className="text-gray-600 mb-6">
          There are no items in your cart to checkout. Please add some items
          first.
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 bg-slate-50 my-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Checkout Form</h2>

      {message && (
        <div
          className={`mb-4 p-2 rounded ${
            isSuccess
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="md:col-span-3 text-lg font-medium text-gray-900">
            Personal Information
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              readOnly
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
            <input type="hidden" name="firstName" value={formData.firstName} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              readOnly
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
            <input type="hidden" name="lastName" value={formData.lastName} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              value={formData.email}
              readOnly
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
            <input type="hidden" name="email" value={formData.email} />
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="md:col-span-2 text-lg font-medium text-gray-900">
            Contact Information
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Telephone
            </label>
            <input
              type="text"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Preferred Contact Method
            </label>
            <select
              name="contactMethod"
              value={formData.contactMethod}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
            >
              <option value="call">Phone Call</option>
              <option value="message">Text Message</option>
              <option value="email">Email</option>
            </select>
          </div>
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="md:col-span-2 text-lg font-medium text-gray-900">
            Event Details
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estimated Guest Count
            </label>
            <select
              name="guestCount"
              value={formData.guestCount}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
            >
              <option value="less than 100">Less than 100</option>
              <option value="100-200">100-200</option>
              <option value="more than 200">More than 200</option>
            </select>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Event Date <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1 w-full">
              <DatePicker
                selected={formData.eventDate}
                onChange={handleDateChange}
                minDate={new Date()}
                dateFormat="MMMM d, yyyy"
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-8 focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholderText="Select date"
                open={isCalendarOpen}
                onClickOutside={() => setIsCalendarOpen(false)}
                ref={datePickerRef}
                required
                readOnly
              />
              <FaCalendarAlt
                className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600 cursor-pointer"
                onClick={toggleCalendar}
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Comment
            </label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        {/* Payment Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="md:col-span-3 text-lg font-medium text-gray-900">
            Payment Information
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cart Total
            </label>
            <input
              type="text"
              value={`$${formData.cartTotal}`}
              readOnly
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Advance Payment
            </label>
            <input
              type="text"
              value={`$${formData.advancePayment}`}
              readOnly
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Due Payment
            </label>
            <input
              type="text"
              value={`$${formData.duepayment}`}
              readOnly
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Payment Slip <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 flex items-center">
              <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Choose File
                <input
                  type="file"
                  name="slipUrl"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="sr-only"
                  required
                />
              </label>
              <span className="ml-2 text-sm text-gray-500">
                {formData.slipUrl ? formData.slipUrl.name : "No file chosen"}
              </span>
            </div>
            {formData.slipPreview && (
              <div className="mt-2">
                <img
                  src={formData.slipPreview}
                  alt="Preview"
                  className="h-32 object-contain border rounded"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition duration-200 font-medium"
          >
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
