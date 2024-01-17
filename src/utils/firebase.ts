import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
 

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_APIKEY,
  projectId: import.meta.env.VITE_APIKEY,
  storageBucket: import.meta.env.VITE_APIKEY,
  messagingSenderId: import.meta.env.VITE_APIKEY,
  appId: import.meta.env.VITE_APIKEY,
  measurementId: import.meta.env.VITE_APIKEY,
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
