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
    answers: {
        id: string;
        title: string;
        isCorrect: boolean;
    }[]
}
