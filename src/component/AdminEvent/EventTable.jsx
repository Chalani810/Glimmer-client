// EventTable.jsx
import React from "react";
import { FaCamera, FaEdit, FaTrash } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

const EventTable = () => {
  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Photo</th>
            <th className="p-2 text-left">Event</th>
            <th className="p-2 text-left">Description</th>
            <th className="p-2 text-left">Visibility</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(7)].map((_, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <FaCamera />
                </div>
              </td>
              <td className="p-2">Plan your dream wedding</td>
              <td className="p-2">Lorem ipsum dolor sit amet consectetur.</td>
              <td className="p-2">
                <input type="checkbox" className="toggle toggle-sm" />
              </td>
              <td className="p-2 flex gap-2">
                <FaEdit className="text-blue-500 cursor-pointer" />
                <FaTrash className="text-red-500 cursor-pointer" />
                <BsThreeDotsVertical className="cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
