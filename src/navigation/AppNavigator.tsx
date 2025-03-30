// AppNavigator.tsx
// Usage:
// <AppNavigator userId={authenticatedUserId} />
// Wrap entire app in NavigationContainer (already included)

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VoiceJournalScreen from '../screens/VoiceJournalScreen';
import CalendarScreen from '../screens/CalendarScreen';
import { RootStackParamList, RouteNames } from './types';

const Stack = createStackNavigator<RootStackParamList>();

interface AppNavigatorProps {
  userId: string;
}

const AppNavigator: React.FC<AppNavigatorProps> = ({ userId }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="VoiceJournal"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="VoiceJournal"
          component={VoiceJournalScreen}
          initialParams={{ userId }}
          options={{ title: 'Voice Journal' }}
        />
        <Stack.Screen
          name="Calendar"
          component={CalendarScreen}
          initialParams={{ userId }}
          options={{ title: 'Journal Calendar' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;