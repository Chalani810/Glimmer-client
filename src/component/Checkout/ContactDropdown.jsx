// src/components/checkout/ContactDropdown.jsx
import React from "react";

const ContactDropdown = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Preferred Contact Method</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)} // This updates the 'contactMethod' state
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="call">Call</option>
        <option value="message">Message</option>
        <option value="email">Email</option>
      </select>
    </div>
  );
};



export default ContactDropdown;
