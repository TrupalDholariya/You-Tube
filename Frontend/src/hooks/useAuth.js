import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { currentUser, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );

  return {
    user: currentUser,
    isAuthenticated,
    loading,
    error,
    isLoggedIn: isAuthenticated && currentUser !== null,
  };
};

export default useAuth;
