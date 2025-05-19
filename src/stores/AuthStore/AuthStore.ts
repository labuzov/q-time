import { create } from 'zustand';
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

import { firebaseAuth } from '@/firebaseConfig';
import { User } from './types';


type AuthState = {
    user: User | null;
    isInit: boolean;
    handleAuthStateChanged: (user: User | null) => void;
    loginWithEmail: (email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    registerWithEmail: (email: string, password: string) => Promise<void>;
    sendPasswordResetEmail: (email: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>(set => ({
    user: null,
    isInit: false,

    handleAuthStateChanged: (user: User | null) => {
        set({ user, isInit: true });
    },

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
}));
