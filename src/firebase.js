import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "react-chat-a40ed.firebaseapp.com",
  projectId: "react-chat-a40ed",
  storageBucket: "react-chat-a40ed.appspot.com",
  messagingSenderId: "994122803967",
  appId: "1:994122803967:web:be140dff281f55756a3aca",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
