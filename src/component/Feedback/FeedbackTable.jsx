import React from 'react';
import { Pencil, Trash } from 'lucide-react';

const FeedbackTable = ({ feedbacks, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Date</th>
            <th className="p-3">Order ID</th>
            <th className="p-3">Event Name</th>
            <th className="p-3">Message</th>
            <th className="p-3">Rating</th>
            <th className="p-3">Photo</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((fb) => (
            <tr key={fb._id} className="border-t hover:bg-gray-50">
              <td className="p-3">{new Date(fb.date).toLocaleDateString()}</td>
              <td className="p-3">{fb.orderId}</td>
              <td className="p-3">{fb.eventName}</td>
              <td className="p-3">{fb.message}</td>
              <td className="p-3">{'⭐'.repeat(fb.rating)}</td>
              <td className="p-3">
                {fb.photo && (
                  <img src={fb.photo} alt="order" className="h-12 w-12 object-cover rounded" />
                )}
              </td>
              <td className="p-3 space-x-2">
                <button onClick={() => onEdit(fb)}>
                  <Pencil className="text-blue-600" />
                </button>
                <button onClick={() => onDelete(fb._id)}>
                  <Trash className="text-red-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackTable;