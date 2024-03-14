import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBVolVb4WP5zXaPu-Xkds440KjG-FEtFuM",
    authDomain: "exp-tracker-76d94.firebaseapp.com",
    projectId: "exp-tracker-76d94",
    storageBucket: "exp-tracker-76d94.appspot.com",
    messagingSenderId: "862467601219",
    appId: "1:862467601219:web:835a545a72f862972e75f6"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
// export default app;
export default db;