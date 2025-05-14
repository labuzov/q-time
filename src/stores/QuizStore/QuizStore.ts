import { create } from 'zustand';

import { Question, Quiz } from '@/@types/quiz';
import { getQuizProgress } from './utils';


type UserAnswer = {
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
        // load quiz
        const quiz: Quiz = {
            title: 'Название квиза',
            description: 'Описание квиза',
            id: 'quiz1',
            image: 'https://uploads.yasno.live/uploads/psy_test/cover_photo/241/large_2x_Опенер.png',
            createdBy: 'someuserid'
        }

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
        // load questions
        const questions: Question[] = [
            {
                id: 'id1',
                title: 'Первый вопрос',
                answers: [
                    { id: 'a1', title: 'Ответ 1', isCorrect: false },
                    { id: 'a2', title: 'Ответ 2', isCorrect: false },
                    { id: 'a3', title: 'Ответ 3', isCorrect: true }
                ]
            },
            {
                id: 'id2',
                title: 'Второй вопрос',
                answers: [
                    { id: 'a4', title: 'Ответ 1', isCorrect: true },
                    { id: 'a5', title: 'Ответ 2', isCorrect: false },
                    { id: 'a6', title: 'Ответ 3', isCorrect: false }
                ]
            },
            {
                id: 'id3',
                title: 'Третий вопрос',
                answers: [
                    { id: 'a7', title: 'Ответ 1', isCorrect: true },
                    { id: 'a8', title: 'Ответ 2', isCorrect: false },
                    { id: 'a9', title: 'Ответ 3', isCorrect: false }
                ]
            }
        ];

        set({
            isStarted: true,
            questions,
            currentQuestion: questions[0],
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
