// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {fireStore, getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCU74rbgwKtwD1ephA6VTZqqBHHufGQh5U",
  authDomain: "e-commercesite-12cac.firebaseapp.com",
  projectId: "e-commercesite-12cac",
  storageBucket: "e-commercesite-12cac.appspot.com",
  messagingSenderId: "343767542253",
  appId: "1:343767542253:web:2ac8bfc63bf135acc01fe4",
  measurementId: "G-Y4JL2135BE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const auth = getAuth(app)