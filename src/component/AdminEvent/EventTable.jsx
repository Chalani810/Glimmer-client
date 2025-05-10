import React from "react";
import { FaCamera, FaEdit, FaTrash } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

const EventTable = ({ events, handleEdit, handleDeleteRequest }) => {
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
          {events.map((event, idx) => (
            <tr key={event._id || idx} className="border-t">
              <td className="p-2">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {event.photoUrl ? (
                    <img
                      src={event.photoUrl}
                      alt={event.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <FaCamera className="text-gray-400" />
                  )}
                </div>
              </td>
              <td className="p-2">{event.title}</td>
              <td className="p-2">{event.description}</td>
              <td className="p-2">
                <input
                  type="checkbox"
                  className="toggle toggle-sm"
                  checked={event.visibility}
                  readOnly
                />
              </td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => handleEdit(event)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteRequest(event._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
                <button className="hover:text-gray-700">
                  <BsThreeDotsVertical />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
