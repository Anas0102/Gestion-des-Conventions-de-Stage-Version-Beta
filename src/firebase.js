// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGbgKGDEdFPK5HjexjP0h2xobEnar0WfQ",
  authDomain: "gestion-stages-app.firebaseapp.com",
  projectId: "gestion-stages-app",
  storageBucket: "gestion-stages-app.appspot.com",
  messagingSenderId: "700440853831",
  appId: "1:700440853831:web:703e2795ae8f7b3ce42062"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app)