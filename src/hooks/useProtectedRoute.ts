import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/stores/AuthStore';
import { ROUTES } from '@/constants/routes';


export const useProtectedRoute = () => {
    const user = useAuthStore(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) return;

        navigate(ROUTES.forbidden.get());
    }, [user])
}
