import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [wardens, setWardens] = useState([]);

  useEffect(() => {
    fetchWardens();
  }, []);

  const fetchWardens = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/wardens');
      setWardens(res.data);
    } catch (err) {
      console.error('Error fetching wardens:', err);
    }
  };

  return (
    <div>
      <h2>All Fire Wardens</h2>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Staff Number</th>
            <th>Name</th>
            <th>Location</th>
            <th>Time Logged</th>
          </tr>
        </thead>
        <tbody>
          {wardens.map((w) => (
            <tr key={w.id}>
              <td>{w.staff_number}</td>
              <td>{w.first_name} {w.last_name}</td>
              <td>{w.location}</td>
              <td>{new Date(w.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
