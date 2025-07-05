import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import { AuthContext } from '../providers/AuthProvider';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();

    if (loading || isAdminLoading) {
        return <progress className='progress w-56'></progress>;
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/login" replace />;
};

export default AdminRoute;
