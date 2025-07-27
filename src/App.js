import React from 'react';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VendorRegister from './components/VendorRegister';
import VendorLogin from './components/VendorLogin';
import VendorDashboard from './pages/VendorDashboard';
import SupplierDashboard from './pages/SupplierDashboard';
import ProductUploaderPage from './pages/ProductUploaderPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* ✅ This was missing */}
        <Route path="/vendor-register" element={<VendorRegister />} />
        <Route path="/vendor-login" element={<VendorLogin />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
        <Route path="/upload-product" element={<ProductUploaderPage />} />
      </Routes>
    </Router>
  );
}

export default App;

