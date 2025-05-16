import React, { useState } from 'react';
import axios from 'axios';

const PredictForm = () => {
  const [formData, setFormData] = useState({
    event_type: '',
    product_name: '',
    quantity: '',
    unit_price: '',
    duration_days: '',
    season_period: '',
    month: '',
    year: ''
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/predict/predict', formData);
      setPrediction(res.data.prediction);
    } catch (error) {
      console.error('Prediction error:', error);
      alert('Error making prediction. Check console for details.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2>Revenue Prediction Form</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>{key.replaceAll('_', ' ')}</label>
            <input
              type="text"
              name={key}
              value={value}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
        ))}
        <button type="submit" style={{ padding: '10px 20px' }}>Predict</button>
      </form>

{prediction !== null && (
  <div style={{ marginTop: '20px', background: '#f0f0f0', padding: '10px' }}>
    <strong>Predicted Revenue:</strong> {Number(prediction).toFixed(2)}
  </div>
)}

    </div>
  );
};

export default PredictForm;
