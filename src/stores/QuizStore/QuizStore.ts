import { create } from 'zustand';

import { Question, Quiz } from '@/@types/quiz';
import { getQuizProgress } from './utils';
import { quizApi } from '@/api/quizApi';


export type UserAnswer = {
    questionId: string;
    value: string[];
}

type QuizState = {
    quiz: Quiz | null;
    questions: Question[];
    isStarted: boolean;
    isEnded: boolean;
    userAnswers: UserAnswer[];
    currentQuestion: Question | null;
    currentQuestionIndex: number | null;
    progress: number;
    initQuiz: (quizId: string) => Promise<void>;
    startQuiz: () => Promise<void>;
    submitAnswer: (questionId: string, value: string[]) => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
    quiz: null,
    questions: [],
    isStarted: false,
    isEnded: false,
    userAnswers: [],
    currentQuestion: null,
    currentQuestionIndex: null,
    progress: 0,

    initQuiz: async (quizId: string) => {
        const quiz = await quizApi.getQuizById(quizId);

        set({
            quiz,
            questions: [],
            currentQuestion: null,
            currentQuestionIndex: null,
            isStarted: false,
            isEnded: false,
            progress: 0,
            userAnswers: []
        });
    },

    startQuiz: async () => {
        const { quiz } = get();
        if (!quiz?.id) return;

        const questions = await quizApi.getQuizQuestions(quiz.id);

        set({
            isStarted: true,
            questions,
            currentQuestion: questions?.[0],
            currentQuestionIndex: 0
        });
    },

    submitAnswer: (questionId: string, value: string[]) => {
        const { questions, currentQuestion, userAnswers } = get();

        const currentIndex = questions.findIndex(({ id }) => id === currentQuestion?.id);
        const isLastQuestion = currentIndex === questions.length - 1;

        const nextIndex = isLastQuestion ? null : currentIndex + 1;
        const nextQuestion = !nextIndex ? null : questions[nextIndex];

        const progress = getQuizProgress(questions.length, currentIndex + 1);

        set({
            currentQuestion: nextQuestion,
            currentQuestionIndex: nextIndex,
            isEnded: isLastQuestion,
            progress,
            userAnswers: [...userAnswers, { questionId, value }]
        });
    },
}));
