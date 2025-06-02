import { useEffect, useState } from 'react';

import { Quiz } from '@/@types/quiz';
import { quizApi } from '@/api/quizApi';
import { useLoading } from '@/hooks/useLoading';


export const useHomePage = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const { isLoading: isQuizListLoading, addToLoading: addToQuizListLoading } = useLoading();

    useEffect(() => {
        addToQuizListLoading(loadQuizzes);
    }, []);

    const loadQuizzes = async () => {
        const data = await quizApi.getQuizzes();
        setQuizzes(data ?? []);
    }

    return {
        quizzes,
        isQuizListLoading
    }
}