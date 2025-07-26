import React from 'react';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VendorDashboard from './pages/VendorDashboard';
import SupplierDashboard from './pages/SupplierDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* ✅ This was missing */}
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

