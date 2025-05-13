import React, { useState, useEffect } from 'react';

const FeedbackModal = ({ isEdit, feedback, onClose, onRefresh }) => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    date: currentDate,
    orderId: '',
    eventName: '',
    message: '',
    rating: 0,
    photo: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit && feedback) {
      // Split stored userName into first and last names
      const nameParts = feedback.userName?.split(' ') || ['', ''];
      setFormData({
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        date: feedback.date || currentDate,
        orderId: feedback.orderId || '',
        eventName: feedback.eventName || '',
        message: feedback.message || '',
        rating: feedback.rating || 0,
        photo: feedback.photo || null
      });
    } else {
      const user = JSON.parse(localStorage.getItem('user')) || {};
      const nameParts = (user.name || '').split(' ');
      setFormData({
        firstName: nameParts[0] || '',
        lastName: nameParts.length > 1 ? nameParts.slice(1).join(' ') : '',
        date: currentDate,
        orderId: '',
        eventName: '',
        message: '',
        rating: 0,
        photo: null
      });
    }
  }, [isEdit, feedback, currentDate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);  

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('orderId', formData.orderId);
      formDataToSend.append('eventName', formData.eventName);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('rating', formData.rating.toString());
      if (formData.photo) {
        formDataToSend.append('photo', formData.photo);
      }
  
      const backendBase = 'http://localhost:5000'; // Your Express server
      const method = isEdit ? 'PUT' : 'POST';
      const url = isEdit 
      ? `/api/feedback/${feedback._id}`  // Note: '/api/feedback' not '/feedbacks'
      : '/api/feedback';

      const response = await fetch(url, {
        method,
        body: formDataToSend,
        credentials: 'include'
      });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to submit feedback');
        }
    
        const result = await response.json();
        console.log('Feedback saved:', result);
        
        onClose();
        onRefresh();
      } catch (err) {
        console.error('Submission error:', err);
        setError(err.message || 'An error occurred while submitting feedback');
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl overflow-y-auto" style={{ maxHeight: '90vh' }}>
        <div className="p-5">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold text-gray-800">
              {isEdit ? 'Edit Feedback' : 'Add New Feedback'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={isSubmitting}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={currentDate}
                max={currentDate}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
                disabled={isSubmitting}
              />
              <p className="text-xs text-gray-500 mt-1">Only today's date can be selected</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order ID *</label>
              <select
                name="orderId"
                value={formData.orderId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
                disabled={isSubmitting}
              >
                <option value="">Select Order</option>
                <option value="ORD-001">ORD-001</option>
                <option value="ORD-002">ORD-002</option>
                <option value="ORD-003">ORD-003</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Name *</label>
              <input
                type="text"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Feedback Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating *</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className={`text-2xl ${star <= formData.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    disabled={isSubmitting}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Photo {formData.photo && '(Selected)'}
              </label>
              <div className="mt-1 flex items-center">
                <label className={`cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  Choose File
                  <input
                    type="file"
                    name="photo"
                    onChange={handleChange}
                    className="sr-only"
                    accept="image/*"
                    disabled={isSubmitting}
                  />
                </label>
                {formData.photo && (
                  <span className="ml-2 text-sm text-gray-500">
                    {formData.photo.name || 'File selected'}
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isEdit ? 'Updating...' : 'Submitting...'}
                  </span>
                ) : (
                  isEdit ? 'Update' : 'Submit'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;