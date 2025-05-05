import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute() {
    const { agent, loading } = useAuth();

    if (loading) {
        return <div className="text-center py-12">Loading...</div>;
    }

    // If not logged in, redirect to /login
    if (!agent) {
        return <Navigate to="/login" replace />;
    }

    // Else, render the nested route (using <Outlet />)
    return <Outlet />;
}
