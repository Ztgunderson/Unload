// types.ts
// Usage: 
// import type { RootStackParamList } from './types'
// Use in components with useNavigation<StackNavigationProp<RootStackParamList>>()

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  MainTabs: undefined;
  Login: undefined;
};

export type MainTabParamList = {
  JournalList: undefined;
  NewEntry: undefined;
  Calendar: undefined;
  Profile: undefined;
};

export type StackNavigationProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};

export type RouteNames = keyof RootStackParamList | keyof MainTabParamList;