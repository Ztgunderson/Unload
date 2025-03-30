import { Link, useRouter } from 'expo-router';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      "(tabs)/journal": undefined;
      "(tabs)/calendar": undefined;
      // Add other routes here
    }
  }
}

declare module 'expo-router' {
  interface LinkProps {
    href: 
      | keyof ReactNavigation.RootParamList
      | { pathname: keyof ReactNavigation.RootParamList; params?: unknown };
  }
}
