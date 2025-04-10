// App.tsx
// Main application entry point
// Wraps the entire app with NavigationContainer and provides navigation structure

import { Slot } from 'expo-router';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

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
export default function App() {
  const [fontsLoaded] = useFonts({
    // Add your custom fonts here if needed
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <Slot />;
}