export const ROUTES = {
    quiz: {
        path: '/quiz/:id',
        get: (id: string) => `/quiz/${id}`
    },
    quizEditor: {
        path: '/editor/:id',
        get: (id?: string) => `/editor/${id ?? 'new'}`
    },
    myQuizzes: {
        path: '/my-quizzes',
        get: () => '/my-quizzes'
    }
}
