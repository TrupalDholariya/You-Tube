/**
 * Redux Helper Utilities
 * Common patterns and helper functions for Redux operations
 */

/**
 * Handle async thunk with loading and error states
 * @param {Function} dispatch - Redux dispatch function
 * @param {Function} thunk - Async thunk to execute
 * @param {Object} options - Options for handling success/error
 */
export const handleAsyncThunk = async (dispatch, thunk, options = {}) => {
  const {
    onSuccess,
    onError,
    successMessage,
    errorMessage,
    showToast = false,
  } = options;

  try {
    const result = await dispatch(thunk).unwrap();
    
    if (onSuccess) {
      onSuccess(result);
    }
    
    if (showToast && successMessage) {
      // You can integrate your toast library here
      console.log(successMessage);
    }
    
    return { success: true, data: result };
  } catch (error) {
    if (onError) {
      onError(error);
    }
    
    if (showToast && errorMessage) {
      // You can integrate your toast library here
      console.error(errorMessage, error);
    }
    
    return { success: false, error };
  }
};

/**
 * Create a selector hook for a specific slice
 * @param {string} sliceName - Name of the Redux slice
 */
export const createSliceSelector = (sliceName) => {
  return (selector) => (state) => selector(state[sliceName]);
};

/**
 * Check if user has specific permissions
 * @param {Object} user - Current user object
 * @param {string|Array} permissions - Permission(s) to check
 */
export const hasPermission = (user, permissions) => {
  if (!user) return false;
  
  const userPermissions = user.permissions || [];
  const requiredPermissions = Array.isArray(permissions) ? permissions : [permissions];
  
  return requiredPermissions.every(permission => 
    userPermissions.includes(permission)
  );
};

/**
 * Check if user owns a resource
 * @param {Object} user - Current user object
 * @param {string} resourceOwnerId - ID of the resource owner
 */
export const isResourceOwner = (user, resourceOwnerId) => {
  if (!user || !resourceOwnerId) return false;
  return user._id === resourceOwnerId;
};

/**
 * Format user display name
 * @param {Object} user - User object
 */
export const getUserDisplayName = (user) => {
  if (!user) return 'Guest';
  return user.fullName || user.userName || 'User';
};

/**
 * Check if user is authenticated
 * @param {Object} userState - User state from Redux
 */
export const isAuthenticated = (userState) => {
  return userState.isAuthenticated && userState.currentUser !== null;
};

/**
 * Get user initials for avatar placeholder
 * @param {Object} user - User object
 */
export const getUserInitials = (user) => {
  if (!user) return '?';
  
  if (user.fullName) {
    const names = user.fullName.split(' ');
    return names.map(name => name[0]).join('').toUpperCase().slice(0, 2);
  }
  
  return user.userName ? user.userName[0].toUpperCase() : '?';
};

/**
 * Debounce function for Redux actions
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Create a protected route checker
 * @param {Object} userState - User state from Redux
 * @param {Array} requiredRoles - Required roles for access
 */
export const canAccessRoute = (userState, requiredRoles = []) => {
  if (!isAuthenticated(userState)) return false;
  
  if (requiredRoles.length === 0) return true;
  
  const userRoles = userState.currentUser?.roles || [];
  return requiredRoles.some(role => userRoles.includes(role));
};

/**
 * Format error message from Redux error
 * @param {any} error - Error from Redux thunk
 */
export const formatErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.error) return error.error;
  return 'An unexpected error occurred';
};

/**
 * Check if action is pending
 * @param {string} actionType - Action type to check
 */
export const isPending = (actionType) => {
  return actionType.endsWith('/pending');
};

/**
 * Check if action is fulfilled
 * @param {string} actionType - Action type to check
 */
export const isFulfilled = (actionType) => {
  return actionType.endsWith('/fulfilled');
};

/**
 * Check if action is rejected
 * @param {string} actionType - Action type to check
 */
export const isRejected = (actionType) => {
  return actionType.endsWith('/rejected');
};

export default {
  handleAsyncThunk,
  createSliceSelector,
  hasPermission,
  isResourceOwner,
  getUserDisplayName,
  isAuthenticated,
  getUserInitials,
  debounce,
  canAccessRoute,
  formatErrorMessage,
  isPending,
  isFulfilled,
  isRejected,
};
