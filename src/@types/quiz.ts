export type Quiz = {
    id: string;
    title: string;
    description: string;
    image: string;
    createdBy: string;
}

export type Question = {
    id: string;
    title: string;
    createdBy: string;
    answers: {
        id: string;
        title: string;
        isCorrect: boolean;
    }[]
}

export type QuizDto = Omit<Quiz, 'id'> & {
    id?: string;
}

export type QuestionDto = Omit<Question, 'id'> & {
    id?: string;
    isEdited?: boolean;
}
