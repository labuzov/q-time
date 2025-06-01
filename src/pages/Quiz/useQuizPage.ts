import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useLoading } from '@/hooks/useLoading';
import { useQuizStore } from '@/stores/QuizStore';


export const useQuizPage = () => {
    const store = useQuizStore();

    const { id } = useParams<{ id: string }>();

    const { isLoading, isCompletedOnce, addToLoading } = useLoading();

    useEffect(() => {
        init();
    }, [id]);

    const init = () => {
        if (!id) return;

        addToLoading(() => store.initQuiz(id));
    }

    return {
        store,
        isLoading,
        isCompletedOnce
    }
}