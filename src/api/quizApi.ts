import { Question, Quiz } from '@/@types/quiz';
import { firebaseApi } from './firebaseApi';


export const quizApi = {
    getQuizzes: async () => {
        const data = await firebaseApi.getDocs<Quiz>(`quizzes`);
        return data;
    },

    getQuizById: async (id: string) => {
        const data = await firebaseApi.getDoc<Quiz>(`quizzes/${id}`);
        return data;
    },

    getQuizQuestions: async (quizId: string) => {
        const data = await firebaseApi.getDocs<Question>(`quizzes/${quizId}/questions`);
        return data;
    }
}