// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRBc5vK3P-Rf6WzMTLqrNn9523sGJFflM",
  authDomain: "email-password-auth-f2295.firebaseapp.com",
  projectId: "email-password-auth-f2295",
  storageBucket: "email-password-auth-f2295.firebasestorage.app",
  messagingSenderId: "718800665428",
  appId: "1:718800665428:web:bbe0c730af3333ccb3e6c1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app); 
