/**
 * @Author: Your name
 * @Date:   2024-05-28 10:32:00
 * @Last Modified by:   Your name
 * @Last Modified time: 2024-06-05 06:09:44
 */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhE7U9J1R8TOQ-MDNon8rG_rAahlBCNao",
  authDomain: "adminkultek.firebaseapp.com",
  projectId: "adminkultek",
  storageBucket: "adminkultek.appspot.com",
  messagingSenderId: "55676551569",
  appId: "1:55676551569:web:3eb117b32757881a355a30",
  measurementId: "G-2CH2TTYTHC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app)

