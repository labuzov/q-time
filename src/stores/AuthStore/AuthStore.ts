import { create } from 'zustand';

import { authApi } from '@/api/authApi';
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
        await authApi.loginWithEmail(email, password);
    },

    registerWithEmail: async (email: string, password: string) => {
        await authApi.registerWithEmail(email, password);
    },

    loginWithGoogle: async () => {
        await authApi.loginWithGoogle();
    },

    sendPasswordResetEmail: async (email: string) => {
        await authApi.sendPasswordResetEmail(email);
    },

    logout: async () => {
        await authApi.logout();
    }
}));
