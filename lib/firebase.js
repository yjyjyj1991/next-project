// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZ81CKbFm2eLk6zsJlv9NKR_Z6ermrpAY",
  authDomain: "yj-toy-project.firebaseapp.com",
  projectId: "yj-toy-project",
  storageBucket: "yj-toy-project.appspot.com",
  messagingSenderId: "207181361295",
  appId: "1:207181361295:web:05fac3bc554df78fef40fa",
  measurementId: "G-BZJC0JBMSR",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
console.log("firebase app: ", app);

const firestore = getFirestore();
const forumRef = collection(firestore, "forum");

export async function saveForm(data) {
  addDoc(forumRef, { first: data.first, last: data.last });
}
