// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
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
let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
}

// Get Firestore instance
const db = getFirestore(firebaseApp);

export { db };