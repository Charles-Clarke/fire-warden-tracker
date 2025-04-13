import React from 'react';
import WardenForm from './WardenForm';
import Dashboard from './Dashboard';
import MapDashboard from './MapDashboard';

function App() {
  return (
    <div className="App">
      <h1>Fire Warden Tracker</h1>
      <WardenForm />
      <Dashboard />
      <MapDashboard />
    </div>
  );
}

export default App;
