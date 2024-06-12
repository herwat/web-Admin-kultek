/**
 * @Author: Your name
 * @Date:   2024-05-28 10:32:00
 * @Last Modified by:   Your name
 * @Last Modified time: 2024-06-12 14:03:53
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
  apiKey: "AIzaSyCu49-YgLZvwqZFo1rP-mpNqydk6t9bnSw",
  authDomain: "kuliner-teknik-v1.firebaseapp.com",
  projectId: "kuliner-teknik-v1",
  storageBucket: "kuliner-teknik-v1.appspot.com",
  messagingSenderId: "30054855812",
  appId: "1:30054855812:web:6193ca6905d3487ee07ed1",
  measurementId: "G-BZ0BS5REWZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app)

