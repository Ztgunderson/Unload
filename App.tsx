import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

// Screens
import RecordingScreen from './src/screens/RecordingScreen';
import SummaryScreen from './src/screens/SummaryScreen';

// Define the type for the root tab navigator
export type RootTabParamList = {
  Recording: undefined;
  Summary: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
    background: '#f6f6f6',
    surface: '#ffffff',
    text: '#000000',
    error: '#B00020',
  },
  elevation: {
    level0: 0,
    level1: 1,
    level2: 3,
    level3: 6,
    level4: 8,
    level5: 12,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Recording"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName: keyof typeof MaterialIcons.glyphMap;

                if (route.name === 'Recording') {
                  iconName = focused ? 'mic' : 'mic-off';
                } else if (route.name === 'Summary') {
                  iconName = focused ? 'show-chart' : 'insert-chart-outlined';
                } else {
                  iconName = 'mic';
                }

                return <MaterialIcons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: theme.colors.primary,
              tabBarInactiveTintColor: 'gray',
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            })}
          >
            <Tab.Screen 
              name="Recording" 
              component={RecordingScreen}
              options={{ 
                title: 'Unload',
                headerShown: true,
              }}
            />
            <Tab.Screen 
              name="Summary" 
              component={SummaryScreen}
              options={{ 
                title: 'Summary',
                headerShown: true,
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
} 