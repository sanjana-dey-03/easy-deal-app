import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './components/HomePage';
import VendorDashboard from './pages/VendorDashboard';

import PrivateRoute from './components/PrivateRoute';
import SupplierDashboard from './pages/SupplierDashboard';
import { AuthProvider } from './contexts/AuthContext';
// import OrdersPage from './pages/supplier/OrdersPage';
// import ProductManagementPage from './pages/supplier/ProductManagementPage';
// import DeliverySlotsPage from './pages/supplier/DeliverySlotsPage';
// import DealHourManagementPage from './pages/supplier/DealHourManagementPage';
// import SupplierProfilePage from './pages/supplier/SupplierProfilePage';

const AppRoutes = () => (
    <AuthProvider>


        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />

            {/* Vendor Dashboard - Protected Nested Routes (role: vendor) */}
            <Route
                path="/vendor-dashboard/*"
                element={
                    <PrivateRoute roles={["vendor"]}>
                        <VendorDashboard />
                    </PrivateRoute>
                }
            >
                {/* <Route index element={<VendorOrdersPage />} />
            <Route path="wallet" element={<VendorWalletPage />} />
            <Route path="deal-hour" element={<VendorDealHourPage />} /> */}
            </Route>

            {/* Supplier Dashboard - Protected Nested Routes (role: supplier) */}
            <Route
                path="/supplier-dashboard/*"
                element={
                    <PrivateRoute roles={["supplier"]}>
                        <SupplierDashboard />
                    </PrivateRoute>
                }
            >
                {/* <Route index element={<OrdersPage />} />
            <Route path="products" element={<ProductManagementPage />} />
            <Route path="slots" element={<DeliverySlotsPage />} />
            <Route path="deal-hour" element={<DealHourManagementPage />} />
            <Route path="profile" element={<SupplierProfilePage />} /> */}
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </AuthProvider>
);

export default AppRoutes;