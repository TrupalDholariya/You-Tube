import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';
import { AuthProvider } from './AuthContext';
import { ThemeProvider } from './ThemeContext';
import { VideoProvider } from './VideoContext';

/**
 * AppProviders - Combines all context providers
 * This component wraps the entire app with Redux and Context providers
 * 
 * Architecture:
 * - Redux: For global state that needs to be persisted and shared (user, auth)
 * - Context: For UI state and component-specific state (theme, video player)
 */
export const AppProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <VideoProvider>
            {children}
          </VideoProvider>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
};

export default AppProviders;
