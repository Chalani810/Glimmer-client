import React from "react";

const FormInput = ({ label, type = "text", value, onChange, required = false }) => {
  return (
    <div className="flex flex-col">
      <label className="font-semibold text-sm text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
        required={required}
      />
    </div>
  );
};

export default FormInput;
