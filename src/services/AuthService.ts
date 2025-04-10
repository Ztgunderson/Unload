import { auth, initializeFirebase } from './firebase';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

class AuthService {
  async initialize() {
    try {
      await initializeFirebase();
      
      if (Platform.OS !== 'web') {
        await GoogleSignin.configure({
          webClientId: Constants.expoConfig?.extra?.googleWebClientId,
          offlineAccess: true,
        });
      }
    } catch (error) {
      console.error('Error initializing auth service:', error);
      throw error;
    }
  }

  async signInWithGoogle() {
    try {
      if (Platform.OS === 'web') {
        const provider = new auth.GoogleAuthProvider();
        const result = await auth().signInWithPopup(provider);
        return result.user;
      } else {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        const result = await auth().signInWithCredential(googleCredential);
        
        return result.user;
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  }

  async signOut() {
    try {
      if (Platform.OS !== 'web') {
        await GoogleSignin.signOut();
      }
      await auth().signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  getCurrentUser() {
    return auth().currentUser;
  }

  onAuthStateChanged(callback: (user: any) => void) {
    return auth().onAuthStateChanged(callback);
  }
}

export default new AuthService(); 