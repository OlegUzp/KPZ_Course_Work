// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAT5_KC7igDYfaDzYpPAd2sENo32s0jDuE",
  authDomain: "udodcoursework.firebaseapp.com",
  databaseURL: "https://udodcoursework-default-rtdb.firebaseio.com",
  projectId: "udodcoursework",
  storageBucket: "udodcoursework.appspot.com",
  messagingSenderId: "176321097229",
  appId: "1:176321097229:web:9a578763405b143c9f6f44",
  measurementId: "G-NYG1MPQMW0"
};
const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);