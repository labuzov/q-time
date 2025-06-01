import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { firebaseAuth } from '@/firebaseConfig';


export const authApi = {
    loginWithEmail: async (email: string, password: string) => {
        await signInWithEmailAndPassword(firebaseAuth, email, password);
    },

    registerWithEmail: async (email: string, password: string) => {
        await createUserWithEmailAndPassword(firebaseAuth, email, password);
    },

    loginWithGoogle: async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({   
            prompt: "select_account "
        });

        await signInWithPopup(firebaseAuth, provider);
    },

    sendPasswordResetEmail: async (email: string) => {
        await sendPasswordResetEmail(firebaseAuth, email);
    },

    logout: async () => {
        await firebaseAuth.signOut();
    }
}