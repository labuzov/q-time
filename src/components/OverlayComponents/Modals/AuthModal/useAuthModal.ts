import { useState } from 'react';
import { FirebaseError } from 'firebase/app';

import { useAuthStore } from '@/stores/AuthStore';
import { useLoading } from '@/hooks/useLoading';

import { AuthModalForm, AuthOperationStatus } from './types';


export const useAuthModal = (onAuth?: () => void) => {
    const authStore = useAuthStore();

    const [currentForm, setCurrentForm] = useState<AuthModalForm>(AuthModalForm.Login);
    const [operationStatus, setOperationStatus] = useState<AuthOperationStatus | null>(null);

    const { isLoading, addToLoading } = useLoading();

    const changeCurrentForm = (form: AuthModalForm) => {
        setOperationStatus(null);
        setCurrentForm(form);
    }

    const registerWithEmail = async (email: string, password: string) => {
        try {
            await addToLoading(() => authStore.registerWithEmail(email, password));
            onAuth?.();
        } catch (error: unknown) {
            handleError(error);
        }
    }

    const loginWithEmail = async (email: string, password: string) => {
        try {
            await addToLoading(() => authStore.loginWithEmail(email, password));
            onAuth?.();
        } catch (error: unknown) {
            handleError(error);
        }
    }

    const loginWithGoogle = async () => {
        try {
            await addToLoading(authStore.loginWithGoogle);
            onAuth?.();
        } catch (error: unknown) {
            handleError(error);
        }
    }

    const sendPasswordResetEmail = async (email: string) => {
        try {
            await addToLoading(() => authStore.sendPasswordResetEmail(email));
            setOperationStatus({ text: 'modal.auth.reset.password.success', variant: 'success' });
        } catch (error: unknown) {
            handleError(error);
        }
    }

    const handleError = (error: unknown) => {
        if (error instanceof FirebaseError) {
            setOperationStatus({ text: error.code, variant: 'error' });
        }
    }

    return {
        currentForm,
        operationStatus,
        isLoading,
        changeCurrentForm,
        registerWithEmail,
        loginWithEmail,
        loginWithGoogle,
        sendPasswordResetEmail
    };
}
