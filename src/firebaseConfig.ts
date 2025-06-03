import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';


// public keys, .env is not needed
const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyDrvTV9JSaPFibX2DAHBDRv-60jKEJ7tLg",
    authDomain: "q-time-app.firebaseapp.com",
    projectId: "q-time-app",
    storageBucket: "q-time-app.firebasestorage.app",
    messagingSenderId: "500763083944",
    appId: "1:500763083944:web:8eb05af08c79fec80e2e9d",
    measurementId: "G-MJGGFRR54Y"
}

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseFirestore = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
