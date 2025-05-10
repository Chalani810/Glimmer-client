import React, { useState, useEffect, useRef } from "react";
import { useCart } from "../CartContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

const CheckoutForm = () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const { cartTotal = 0, advancePayment = 0 } = useCart();
  const duepayment = cartTotal - advancePayment;
  const userData = localStorage.getItem("user");


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
    cartTotal: cartTotal.toFixed(2),
    advancePayment: advancePayment.toFixed(2),
    duepayment: duepayment.toFixed(2),
    slipUrl: null,
    slipPreview: null,
  });

  const [isSuccess, setIsSuccess] = useState(null);
  const [message, setMessage] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const datePickerRef = useRef(null);

  // Load user data when component mounts
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch(`${apiUrl}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || "Failed to fetch user details");
          }
          console.log("User data:", data);
          

          
          setFormData(prev => ({
            ...prev,
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            userId: data._id || "",
          }));
        }

      } catch (error) {
        console.error("Failed to load user data:", error);
        setMessage("Failed to load user details. Please try again.");
      }
    };

    loadUserData();
  }, [apiUrl]);

  // Update payment values when cart changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      cartTotal: cartTotal.toFixed(2),
      advancePayment: advancePayment.toFixed(2),
      duepayment: (cartTotal - advancePayment).toFixed(2),
    }));
  }, [cartTotal, advancePayment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      eventDate: date,
    }));
    setIsCalendarOpen(false); // Close calendar after selection
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(prev => !prev);
    if (!isCalendarOpen && datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = file.type.startsWith("image/") ? URL.createObjectURL(file) : null;
      setFormData(prev => ({
        ...prev,
        slipUrl: file,
        slipPreview: preview,
      }));
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
    if (!phoneRegex.test(formData.mobile)) {
      setIsSuccess(false);
      setMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (formData.telephone && !phoneRegex.test(formData.telephone)) {
      setIsSuccess(false);
      setMessage("Please enter a valid 10-digit telephone number.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("orderNumber", formData.orderNumber);
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("telephone", formData.telephone);
    formDataToSend.append("mobile", formData.mobile);
    formDataToSend.append("contactMethod", formData.contactMethod);
    formDataToSend.append("guestCount", formData.guestCount);
    if (formData.eventDate) {
      formDataToSend.append("eventDate", formData.eventDate.toISOString());
    }
    formDataToSend.append("comment", formData.comment);
    formDataToSend.append("cartTotal", formData.cartTotal);
    formDataToSend.append("advancePayment", formData.advancePayment);
    formDataToSend.append("duepayment", formData.duepayment);
    formDataToSend.append("userId", formData.userId);

    if (formData.slipUrl) {
      formDataToSend.append("slip", formData.slipUrl);
    }

    console.log("Form data to send:", formDataToSend);
    

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/checkout/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to submit order");
      }

      setIsSuccess(true);
      setMessage("Order submitted successfully!");

      setFormData({
        orderNumber: "",
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: "",
        telephone: "",
        mobile: "",
        contactMethod: "call",
        guestCount: "less than 100",
        eventDate: null,
        comment: "",
        cartTotal: cartTotal.toFixed(2),
        advancePayment: advancePayment.toFixed(2),
        duepayment: (cartTotal - advancePayment).toFixed(2),
        slipUrl: null,
        slipPreview: null,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSuccess(false);
      setMessage(error.message || "Failed to submit order. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 bg-slate-50">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Checkout Form</h2>
      
      {message && (
        <div className={`mb-4 p-2 rounded ${isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
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
     
        {/* Auto-filled Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              readOnly
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
            <input type="hidden" name="firstName" value={formData.firstName} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              readOnly
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
            <input type="hidden" name="lastName" value={formData.lastName} />
          </div>
        </div>

        {/* Auto-filled Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
          <input type="hidden" name="email" value={formData.email} />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Telephone</label>
          <input
            type="text"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="contactMethod" className="block text-sm font-medium text-gray-700">Preferred Contact Method</label>
          <select
            id="contactMethod"
            name="contactMethod"
            value={formData.contactMethod}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="call">Phone Call</option>
            <option value="message">Text Message</option>
            <option value="email">Email</option>
          </select>
        </div>

        <div>
          <label htmlFor="guestCount" className="block text-sm font-medium text-gray-700">Estimated Guest Count</label>
          <select
            id="guestCount"
            name="guestCount"
            value={formData.guestCount}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="less than 100">Less than 100</option>
            <option value="100-200">100-200</option>
            <option value="more than 200">More than 200</option>
          </select>
        </div>


                {/* Event Date with Calendar Icon */}
                <div>
          <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
            Event Date <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1">
            <DatePicker
              id="eventDate"
              selected={formData.eventDate}
              onChange={handleDateChange}
              minDate={new Date()}
              dateFormat="MMMM d, yyyy"
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholderText="Select event date"
              open={isCalendarOpen}
              onClickOutside={() => setIsCalendarOpen(false)}
              ref={datePickerRef}
              calendarClassName="border-2 border-gray-300 rounded-xl shadow-xl bg-white p-4"
              dayClassName={(date) =>
                date.getTime() === formData?.eventDate?.getTime()
                  ? "text-white bg-blue-600 rounded-full p-2"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-800 p-2 rounded-full"
              }
              weekDayClassName={() => "text-gray-500 font-medium"}
              renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className="flex justify-between items-center mb-4 px-2">
                  <button
                    type="button"
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    className="text-gray-600 hover:text-blue-600 text-xl font-bold disabled:opacity-50 transition-colors"
                  >
                    &lt;
                  </button>
                  <span className="text-xl font-semibold text-gray-800">
                    {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </span>
                  <button
                    type="button"
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    className="text-gray-600 hover:text-blue-600 text-xl font-bold disabled:opacity-50 transition-colors"
                  >
                    &gt;
                  </button>
                </div>
              )}
              required
            />
            <FaCalendarAlt
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 cursor-pointer"
              onClick={toggleCalendar}
            />
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Click the calendar icon to select the date of your event
          </p>
        </div>
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Cart Total</label>
            <input
              type="text"
              value={`$${formData.cartTotal}`}
              readOnly
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Advance Payment</label>
            <input
              type="text"
              value={`$${formData.advancePayment}`}
              readOnly
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Due Payment</label>
            <input
              type="text"
              value={`$${formData.duepayment}`}
              readOnly
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Payment Slip <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 flex items-center">
            <label
              htmlFor="slip-upload"
              className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Choose File
            </label>
            <input
              id="slip-upload"
              name="slipUrl"
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="sr-only"
              required
            />
            <span className="ml-2 text-sm text-gray-500">
              {formData.slipUrl ? formData.slipUrl.name : "No file chosen"}
            </span>
          </div>
          {formData.slipPreview && (
            <div className="mt-2">
              <img
                src={formData.slipPreview}
                alt="Payment slip preview"
                className="h-32 object-contain border rounded"
              />
            </div>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Upload a clear image or PDF of your payment slip
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-200"
          >
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;