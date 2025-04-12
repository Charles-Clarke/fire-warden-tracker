import React, { useState } from 'react';
import axios from 'axios';

function WardenForm() {
  const [formData, setFormData] = useState({
    staff_number: '',
    first_name: '',
    last_name: '',
    location: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/wardens', formData);
      alert('Warden added!');
      setFormData({ staff_number: '', first_name: '', last_name: '', location: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to add warden');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Fire Warden</h2>
      <input name="staff_number" placeholder="Staff Number" value={formData.staff_number} onChange={handleChange} required />
      <input name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} />
      <input name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} />
      <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
      <button type="submit">Add Warden</button>
    </form>
  );
}

export default WardenForm;
