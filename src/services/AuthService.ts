import { auth } from './firebase.config';

class AuthService {
  async signInWithGoogle() {
    try {
      // Sign in with Google
      const result = await auth().signInWithProvider(
        auth.GoogleAuthProvider.PROVIDER_ID
      );
      
      return result.user;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  }

  async signOut() {
    try {
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