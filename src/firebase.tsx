// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzu9EQ0itib9VXOdIYZVI5qi1GRXanyIg",
  authDomain: "anichive-43fd0.firebaseapp.com",
  projectId: "anichive-43fd0",
  storageBucket: "anichive-43fd0.appspot.com",
  messagingSenderId: "766088509376",
  appId: "1:766088509376:web:8397e193b7b4bb2df5ba25",
  measurementId: "G-80W9XXCV87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);

export default app