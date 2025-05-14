import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';

import { useQuizStore } from '@/stores/QuizStore';

import { Loading } from '@/components/Loading';

import { Preview } from './Preview/Preview';
import { Quiz } from './Quiz/Quiz';


const QuizPage: FC = () => {
    const {
        quiz,
        questions,
        currentQuestion,
        currentQuestionIndex,
        isStarted,
        isEnded,
        progress,
        initQuiz,
        startQuiz,
        submitAnswer
    } = useQuizStore(useShallow(({
        quiz,
        questions,
        currentQuestion,
        currentQuestionIndex,
        isStarted,
        isEnded,
        progress,
        initQuiz,
        startQuiz,
        submitAnswer
    }) => ({
        quiz,
        questions,
        currentQuestion,
        currentQuestionIndex,
        isStarted,
        isEnded,
        progress,
        initQuiz,
        startQuiz,
        submitAnswer
    })));

    const { id: quizId } = useParams<{ id: string }>();

    useEffect(() => {
        quizId && initQuiz(quizId);
    }, [quizId]);

    if (!quiz) return (
        <Loading fillContainer />
    );

    return (
        <>
            {isStarted && currentQuestion && (
                <Quiz
                    quiz={quiz}
                    questions={questions}
                    currentQuestion={currentQuestion}
                    currentQuestionIndex={currentQuestionIndex!}
                    progress={progress}
                    onAnswerSubmit={answerId => submitAnswer(currentQuestion?.id, [answerId])}
                />
            )}
            {!isStarted && (
                <Preview
                    title={quiz.title}
                    description={quiz.description}
                    src={quiz.image}
                    onStart={startQuiz}
                />
            )}
            {isEnded && (
                <div className="">end</div>
            )}
        </>
        
    );
}

export default QuizPage;
