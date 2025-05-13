import React, { useState, useEffect } from 'react';
import FeedbackTable from '../component/Feedback/FeedbackTable';
import FeedbackModal from '../component/Feedback/FeedbackModal';

const FeedbackListPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch('/api/feedback');
      const data = await res.json();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleAddNew = () => {
    setIsEdit(false);
    setSelectedFeedback(null);
    setModalOpen(true);
  };

  const handleEdit = (feedback) => {
    setIsEdit(true);
    setSelectedFeedback(feedback);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        await fetch(`/api/feedback/${id}`, { method: 'DELETE' });
        fetchFeedbacks();
      } catch (error) {
        console.error('Error deleting feedback:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Feedbacks</h1>
        <button
          onClick={handleAddNew}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow"
        >
          Add a New Feedback
        </button>
      </div>
      
      <FeedbackTable
        feedbacks={feedbacks}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      {modalOpen && (
        <FeedbackModal
          isEdit={isEdit}
          feedback={selectedFeedback}
          onClose={() => setModalOpen(false)}
          onRefresh={fetchFeedbacks}
        />
      )}
    </div>
  );
};

export default FeedbackListPage;
