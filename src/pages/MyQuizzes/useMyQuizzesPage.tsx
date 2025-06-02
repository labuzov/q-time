import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Quiz } from '@/@types/quiz';
import { quizApi } from '@/api/quizApi';
import { useLoading } from '@/hooks/useLoading';
import { ROUTES } from '@/constants/routes';
import { useOverlayComponentsStore } from '@/stores/OverlayComponentsStore';
import { ConfirmationModal, ConfirmationModalProps } from '@/components/OverlayComponents/Modals/ConfirmationModal';
import { Typography } from '@/components/Typography';


export const useMyQuizzesPage = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const { isLoading, isCompletedOnce, addToLoading } = useLoading();
    const { showComponent } = useOverlayComponentsStore();
    const navigate = useNavigate();

    useEffect(() => {
        addToLoading(loadQuizzes);
    }, []);

    const loadQuizzes = async () => {
        const data = await quizApi.getMyQuizzes();
        setQuizzes(data ?? []);
    }

    const createQuiz = () => {
        navigate(ROUTES.quizEditor.get());
    }

    const editQuiz = (id: string) => {
        navigate(ROUTES.quizEditor.get(id));
    }

    const deleteQuiz = async (quizId: string, title: string) => {
        if (!await showComponent<ConfirmationModalProps, boolean>(
            ConfirmationModal,
            {
                textRender: () => <Typography textId="myQuizzes.actions.delete.message" textOptions={{ value: title }} />
            }
        )) {
            return;
        };

        setQuizzes(list => list.filter(({ id }) => id !== quizId));

        await quizApi.deleteQuiz(quizId);
    }

    return {
        quizzes,
        isLoading: isLoading || !isCompletedOnce,
        createQuiz,
        editQuiz,
        deleteQuiz
    }
}