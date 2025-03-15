// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBntW7oV7PqQ3CdwiBwc7cSSsgutLE9Gs4",
  authDomain: "timeflow-ea246.firebaseapp.com",
  projectId: "timeflow-ea246",
  storageBucket: "timeflow-ea246.firebasestorage.app",
  messagingSenderId: "212000562106",
  appId: "1:212000562106:web:87a1acf89d2c82f7b5db83",
  measurementId: "G-CS1KWP14WN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };