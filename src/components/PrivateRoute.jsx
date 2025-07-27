import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Guards routes for authenticated users.
 * Redirects to HomePage ("/") if no user is logged in.
 */
const PrivateRoute = ({ children, roles }) => {
    const { user } = useAuth();

    // Not logged in -> redirect to home
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // Role-based authorization check
    if (roles && !roles.includes(user.role)) {
        // If user role is not authorized, redirect
        return <Navigate to="/" replace />;
    }

    // Authorized -> render children
    return children;
};

export default PrivateRoute;