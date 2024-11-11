import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCQ56lMDj2ZWFv2lVrtSMnaSwE3_Hdht4Q",
  authDomain: "fir-774d5.firebaseapp.com",
  projectId: "fir-774d5",
  storageBucket: "fir-774d5.firebasestorage.app",
  messagingSenderId: "183002568948",
  appId: "1:183002568948:web:07a2961a7ae9a8a649a6a1",
  measurementId: "G-23D9NTMQJC"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
