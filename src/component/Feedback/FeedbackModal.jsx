import React, { useState, useEffect } from 'react';

const FeedbackModal = ({ isEdit, feedback, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    orderId: '',
    message: '',
    rating: 0,
    photo: ''
  });

  useEffect(() => {
    if (isEdit && feedback) {
      setFormData({ ...feedback });
    } else {
      const user = JSON.parse(localStorage.getItem('user')) || {};
      setFormData((prev) => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [isEdit, feedback]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `/api/feedback/${feedback._id}` : '/api/feedback';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    onClose();
    onRefresh();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">{isEdit ? 'Edit' : 'Add'} Feedback</h2>
        <input name="name" value={formData.name} readOnly className="w-full mb-2 p-2 border rounded" />
        <input name="email" value={formData.email} readOnly className="w-full mb-2 p-2 border rounded" />
        <input name="date" value={formData.date} readOnly className="w-full mb-2 p-2 border rounded" />
        <select
          name="orderId"
          value={formData.orderId}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        >
          <option value="">Select Order</option>
          {/* Replace below with dynamic list from your app */}
          <option value="ORD-001">ORD-001</option>
          <option value="ORD-002">ORD-002</option>
        </select>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Enter your feedback"
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          min="1"
          max="5"
          className="w-full mb-2 p-2 border rounded"
        />
        <input type="file" name="photo" onChange={handleChange} className="w-full mb-2" />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
            {isEdit ? 'Update' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
