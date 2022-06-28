// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwS4B1bDie0jhFpu8DKJoaOsalFpD21xc",
  authDomain: "fitness-app-4b1fc.firebaseapp.com",
  projectId: "fitness-app-4b1fc",
  storageBucket: "fitness-app-4b1fc.appspot.com",
  messagingSenderId: "380162646991",
  appId: "1:380162646991:web:d6799baa3623657c4ba8ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);