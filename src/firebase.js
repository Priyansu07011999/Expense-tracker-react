// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // Your Firebase project configuration
  apiKey: "AIzaSyCSdVu37gW4_F5rPobNhiyNQESemMPi568",
  authDomain: "expense-tracker-d154c.firebaseapp.com",
  databaseURL: "https://expense-tracker-d154c-default-rtdb.firebaseio.com",
  projectId: "expense-tracker-d154c",
  storageBucket: "expense-tracker-d154c.appspot.com",
  messagingSenderId: "1015760407112",
  appId: "1:1015760407112:web:650aa7e268f9201f80a67d",
  measurementId: "G-XVNW8C65J3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }; // Export the auth instance
