import React, { createContext, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentUser, logoutUser, clearError } from '../store/slices/userSlice';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { currentUser, isAuthenticated, loading, error, initialized } = useSelector(
    (state) => state.user
  );

  // Initialize user on mount
  useEffect(() => {
    if (!initialized) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, initialized]);

  const logout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  const value = {
    user: currentUser,
    isAuthenticated,
    isLoggedIn: isAuthenticated && currentUser !== null,
    loading,
    error,
    initialized,
    logout,
    clearError: clearAuthError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;
