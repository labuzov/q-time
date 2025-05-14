export const ROUTES = {
    quiz: {
        path: '/quiz/:id',
        get: (id: string) => `/quiz/${id}`
    },
}
