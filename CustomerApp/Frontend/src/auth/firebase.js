import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword,GoogleAuthProvider } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyBMZnFVuAI40fa7fqJWfE1lRq4fmaZ116I",
    authDomain: "bookabite-auth.firebaseapp.com",
    projectId: "bookabite-auth",
    storageBucket: "bookabite-auth.appspot.com",
    messagingSenderId: "67993014260",
    appId: "1:67993014260:web:e63671b3a2db3a281e33a1",
    measurementId: "G-TXSJTXGC2B"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  export const auth = getAuth(firebaseApp);
  export const googleAuthProvider = new GoogleAuthProvider();
  export const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };