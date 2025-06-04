export const FORM_CONFIG = {
    auth: {
        password: {
            min: 6,
            max: 32
        }
    },
    quiz: {
        title: {
            min: 6,
            max: 100
        },
        description: {
            min: 10,
            max: 200
        },
        image: {
            maxSizeInMb: 1
        }
    },
    questions: {
        minCount: 1,
        maxCount: 30,

        title: {
            min: 5,
            max: 200
        }
    },
    answers: {
        minCount: 2,
        maxCount: 4,

        title: {
            min: 1,
            max: 100
        }
    }
}