// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZFth0e17wRFQjL8iVTje2ndnjV0ibGFQ",
  authDomain: "pricebud-c73f6.firebaseapp.com",
  projectId: "pricebud-c73f6",
  storageBucket: "pricebud-c73f6.appspot.com",
  messagingSenderId: "863960445953",
  appId: "1:863960445953:web:d6a4004e3aa7ef696b7c00"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;