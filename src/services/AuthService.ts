import { auth, initializeFirebase } from './firebase';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

class AuthService {
  async initialize() {
    await initializeFirebase();
    await GoogleSignin.configure({
      webClientId: 'YOUR_WEB_CLIENT_ID', // Replace with your web client ID
      offlineAccess: true,
    });
  }

  async signInWithGoogle() {
    try {
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const result = await auth().signInWithCredential(googleCredential);
      
      return result.user;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  }

  async signOut() {
    try {
      await GoogleSignin.signOut();
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