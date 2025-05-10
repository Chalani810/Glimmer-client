import React, { useState, useEffect } from 'react';
import FeedbackTable from '../component/Feedback/FeedbackTable';
import FeedbackModal from '../component/Feedback/FeedbackModal';

const FeedbackListPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const fetchFeedbacks = async () => {
    const res = await fetch('/api/feedback');
    const data = await res.json();
    setFeedbacks(data);
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
      await fetch(`/api/feedback/${id}`, { method: 'DELETE' });
      fetchFeedbacks();
    }
  };

  return (
    <>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Your Feedback</h2>
          <button
            onClick={handleAddNew}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Add New Feedback
          </button>
        </div>
        <FeedbackTable
          feedbacks={feedbacks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      {modalOpen && (
        <FeedbackModal
          isEdit={isEdit}
          feedback={selectedFeedback}
          onClose={() => setModalOpen(false)}
          onRefresh={fetchFeedbacks}
        />
      )}
      
    </>
  );
};

export default FeedbackListPage;
