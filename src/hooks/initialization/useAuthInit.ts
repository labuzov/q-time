import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useShallow } from 'zustand/shallow';

import { useAuthStore } from '@/stores/AuthStore';
import { firebaseAuth } from '@/firebaseConfig';


export const useAuthInit = () => {
    const { isInit, handleAuthStateChanged } = useAuthStore(useShallow(({
            isInit, handleAuthStateChanged
        }) => ({
            isInit, handleAuthStateChanged
        })));

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, handleAuthStateChanged);

        return () => {
            unsubscribe();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { isAuthInit: isInit };
}
