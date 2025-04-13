import React, { useState } from 'react';
import axios from 'axios';
import './WardenForm.css'; // Optional for positioning styles

const buildings = [
  { name: 'King Alfred Centre', top: '20%', left: '35%' },
  { name: 'Kenneth Kettle Building', top: '30%', left: '45%' },
  { name: 'Martial Rose Library', top: '25%', left: '50%' },
  { name: 'Medecroft', top: '65%', left: '30%' },
  { name: 'West Downs Centre', top: '40%', left: '75%' },
  // Add more as needed based on visual position
];

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

  const handleMapClick = (buildingName) => {
    setFormData(prev => ({
      ...prev,
      location: buildingName
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
    <div>
      <h2>Log Your Location</h2>
      <form onSubmit={handleSubmit}>
        <input name="staff_number" placeholder="Staff Number" value={formData.staff_number} onChange={handleChange} required />
        <input name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} />
        <input name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
        <button type="submit">Add Warden</button>
      </form>

      <div className="map-container">
        <h3>Click a building on the map</h3>
        <div className="map-wrapper">
          <img src="/campus_map.png" alt="Campus Map" className="campus-map" />
          {buildings.map((b, i) => (
            <button
              key={i}
              className="map-pin"
              style={{ top: b.top, left: b.left }}
              onClick={() => handleMapClick(b.name)}
            >
              📍
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WardenForm;
