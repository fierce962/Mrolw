import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBjyupFyxyRKUn_XPEyO5TMNy7TfYD33uo",
    authDomain: "mrowl-8123a.firebaseapp.com",
    projectId: "mrowl-8123a",
    storageBucket: "mrowl-8123a.appspot.com",
    messagingSenderId: "974160947359",
    appId: "1:974160947359:web:1f2e415775af731d7e1aaa",
    measurementId: "G-MG6HHVB4S8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);