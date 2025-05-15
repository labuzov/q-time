import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useQuizStore } from '@/stores/QuizStore';
import { useLoading } from '@/hooks/useLoading';

import { Loading } from '@/components/Loading';

import { Preview } from './Preview/Preview';
import { Quiz } from './Quiz/Quiz';
import { Result } from './Result/Result';
import { ErrorPage } from '../Errors/ErrorPage';


const QuizPage: FC = () => {
    const store = useQuizStore();

    const { id: quizId } = useParams<{ id: string }>();

    const { isLoading, isCompletedOnce, addToLoading } = useLoading();

    useEffect(() => {
        init();
    }, [quizId]);

    const init = () => {
        if (!quizId) return;

        addToLoading(() => store.initQuiz(quizId));
    }

    const renderContent = () => {
        const {
            quiz, questions, currentQuestion, currentQuestionIndex,
            progress, isStarted, isEnded, userAnswers, startQuiz, submitAnswer 
        } = store;

        if (!isCompletedOnce || isLoading) return (
            <Loading fillContainer />
        );

        const isPreview = !isStarted && !!quiz;
        if (isPreview) return (
            <Preview
                title={quiz.title}
                description={quiz.description}
                src={quiz.image}
                onStart={startQuiz}
            />
        );
    
        const isQuizStarted = isStarted && !!quiz && currentQuestion;
        if (isQuizStarted) return (
            <Quiz
                quiz={quiz}
                questions={questions}
                currentQuestion={currentQuestion}
                currentQuestionIndex={currentQuestionIndex!}
                progress={progress}
                onAnswerSubmit={answerId => submitAnswer(currentQuestion?.id, [answerId])}
            />
        );

        const isQuizEnded = isEnded;
        if (isQuizEnded) return (
            <Result
                questions={questions}
                userAnswers={userAnswers}
            />
        );

        return (
            <ErrorPage />
        );
    }


    return (
        <>
            {renderContent()}
        </>
        
    );
}

export default QuizPage;
