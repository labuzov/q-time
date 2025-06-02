import { Question, QuestionDto, Quiz, QuizDto } from '@/@types/quiz';
import { firebaseAuth } from '@/firebaseConfig';

import { firebaseApi } from './firebaseApi';


export const quizApi = {
    getQuizzes: async () => {
        const data = await firebaseApi.getDocs<Quiz>(`quizzes`);
        return data;
    },

    getMyQuizzes: async () => {
        const data = await firebaseApi.getDocs<Quiz>(`quizzes`, {
            fieldPath: 'createdBy',
            opStr: "==",
            value: firebaseAuth.currentUser?.uid ?? ''
        });
        return data;
    },

    getQuizById: async (id: string) => {
        const data = await firebaseApi.getDoc<Quiz>(`quizzes/${id}`);
        return data;
    },

    getQuizQuestions: async (quizId: string) => {
        const data = await firebaseApi.getDocs<Question>(`quizzes/${quizId}/questions`);
        return data;
    },

    createQuiz: async (quiz: QuizDto, questions: QuestionDto[]) => {
        const id = await firebaseApi.createDoc(`quizzes`, quiz);
        if (!id) return;

        await firebaseApi.addDocs(`quizzes/${id}/questions`, questions);
    },

    updateQuiz: async (quizId: string, quiz: QuizDto, questions: QuestionDto[]) => {
        await firebaseApi.updateDoc(`quizzes/${quizId}`, quiz);
        await firebaseApi.clearDocs(`quizzes/${quizId}/questions`);
        await firebaseApi.addDocs(`quizzes/${quizId}/questions`, questions);
    },

    deleteQuiz: async (quizId: string) => {
        await firebaseApi.clearDocs(`quizzes/${quizId}/questions`);
        await firebaseApi.deleteDoc(`quizzes/${quizId}`);
    }
}