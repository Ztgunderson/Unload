import { Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

// Import Firebase based on platform
let auth: any;
let firestore: any;
let functions: any;

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId,
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
  appId: Constants.expoConfig?.extra?.firebaseAppId
};

if (Platform.OS === 'web') {
  const firebase = require('firebase/app');
  require('firebase/auth');
  require('firebase/firestore');
  require('firebase/functions');

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  auth = firebase.auth;
  firestore = firebase.firestore;
  functions = firebase.functions;
} else {
  const nativeAuth = require('@react-native-firebase/auth');
  const nativeFirestore = require('@react-native-firebase/firestore');
  const nativeFunctions = require('@react-native-firebase/functions');

  auth = nativeAuth;
  firestore = nativeFirestore;
  functions = nativeFunctions;
}

WebBrowser.maybeCompleteAuthSession();

// Initialize Firebase
export const initializeFirebase = async () => {
  try {
    if (Platform.OS === 'web') {
      const app = firebase.initializeApp(firebaseConfig);
      const authInstance = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
      });
      
      return {
        auth: authInstance,
        firestore: firestore(),
        functions: functions()
      };
    } else {
      // For mobile, Firebase is initialized automatically
      return {
        auth: auth(),
        firestore: firestore(),
        functions: functions()
      };
    }
  } catch (error) {
    console.error('Firebase initialization error:', error);
    throw error;
  }
};

export { auth, firestore, functions }; 