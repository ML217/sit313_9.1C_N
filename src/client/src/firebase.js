// Import the functions you need from needed SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDU2_xuBllposjCeOSFBMl2Z_e0J6QCP54",
  authDomain: "devdeakin-app-78956.firebaseapp.com",
  projectId: "devdeakin-app-78956",
  storageBucket: "devdeakin-app-78956.firebasestorage.app",
  messagingSenderId: "674574417452",
  appId: "1:674574417452:web:d6cce22976e8bdecc21b89",
  measurementId: "G-CJMZ76LL18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth =getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage };