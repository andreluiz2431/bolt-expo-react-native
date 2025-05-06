import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBiCcwPrezlagHLkkcjq5phxi2ke0Hj1RQ",
    authDomain: "runner-coach-b745a.firebaseapp.com",
    projectId: "runner-coach-b745a",
    storageBucket: "runner-coach-b745a.firebasestorage.app",
    messagingSenderId: "46370273739",
    appId: "1:46370273739:web:d0a3423da5965bdda6de4e",
    measurementId: "G-RW69EMGCRS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

export { db };
