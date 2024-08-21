import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPwhB0Lm7a_8kd3jDkxvOrfyXGZG601xk",
  authDomain: "fir-apps-e5e55.firebaseapp.com",
  projectId: "fir-apps-e5e55",
  storageBucket: "fir-apps-e5e55.appspot.com",
  messagingSenderId: "271277296576",
  appId: "1:271277296576:web:dc8a0435a7ff193cbfd625"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);