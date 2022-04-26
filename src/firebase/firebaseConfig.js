// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNinDon2zD3f6e087ziKKi4nHgSiKNhdQ",
  authDomain: "pt-weather.firebaseapp.com",
  projectId: "pt-weather",
  storageBucket: "pt-weather.appspot.com",
  messagingSenderId: "270754964674",
  appId: "1:270754964674:web:4e9b86132de0a3926e075b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const google = new GoogleAuthProvider();
const facebook = new FacebookAuthProvider();
const BD = getFirestore();

export { app, google, facebook, BD };
