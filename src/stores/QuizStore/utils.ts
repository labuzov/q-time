export const getQuizProgress = (questionCount: number, answeredCount: number) => {
    return Math.round(100 / questionCount * answeredCount);
}