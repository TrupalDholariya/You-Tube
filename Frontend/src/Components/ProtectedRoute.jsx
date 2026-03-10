import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { isLoggedIn, loading, initialized } = useAuthContext();
  const location = useLocation();

  // Show loading while checking authentication
  if (!initialized || loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#121212] text-white">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#ae7aff] border-r-transparent"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render children if authenticated
  return children;
}

export default ProtectedRoute;
