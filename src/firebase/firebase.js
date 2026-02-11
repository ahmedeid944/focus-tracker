import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1vMRqmNATwQgQny6hDGmJJXShNLnWbnk",
  authDomain: "vite-9b594.firebaseapp.com",
  projectId: "vite-9b594",
  storageBucket: "vite-9b594.appspot.com",
  messagingSenderId: "1066889931432",
  appId: "1:1066889931432:web:655f247f28e342472a309d",
  measurementId: "G-X9FCNGC4LK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
