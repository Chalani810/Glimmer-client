import React from "react";

const GuestCountDropdown = ({ value, onChange }) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Participated Guest Count</label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
        <option value="less than 50">Less than 50</option>
        <option value="50-100">50 - 100</option>
        <option value="more than 100">More than 100</option>
        </select>
      </div>
    );
  };

  export default GuestCountDropdown;