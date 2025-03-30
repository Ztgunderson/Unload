// App.tsx
// Main application entry point
// Wraps the entire app with NavigationContainer and provides navigation structure

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

/**
 * Main App Component
 * 
 * This is the root component of the application. It:
 * - Sets up the navigation container
 * - Provides the navigation stack
 * - Passes the user ID to all screens (in real app, get from auth context)
 * 
 * Usage:
 * The NavigationContainer should wrap all navigation components
 * AppNavigator contains the stack navigation structure
 * User ID should come from your authentication system
 */
const App = () => {
  // In a real application, get userId from authentication context/provider
  const userId = 'test-user-id'; // Replace with actual authentication logic
  
  return (
    <NavigationContainer>
      <AppNavigator userId={userId} />
    </NavigationContainer>
  );
};

export default App;