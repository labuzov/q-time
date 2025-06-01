import { Question, QuestionDto, Quiz, QuizDto } from '@/@types/quiz';
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
    }
}