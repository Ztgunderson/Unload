// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAE6Z8IHiLt8bLwqChkIQDrEDhkLriHlkU",
  authDomain: "unload-5b68f.firebaseapp.com",
  projectId: "unload-5b68f",
  storageBucket: "unload-5b68f.firebasestorage.app",
  messagingSenderId: "739709121547",
  appId: "1:739709121547:web:bc33f6a1c1cd26def9c30e",
  measurementId: "G-3L3HQDCFGL"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Get service instances
const db = getFirestore(app);
const auth = getAuth(app);

// Export everything needed
export { db, auth, Timestamp };