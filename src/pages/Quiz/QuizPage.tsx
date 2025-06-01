import { FC } from 'react';

import { Loading } from '@/components/Loading';

import { Preview } from './Preview/Preview';
import { Quiz } from './Quiz/Quiz';
import { Result } from './Result/Result';
import { ErrorPage } from '../Errors/ErrorPage';
import { useQuizPage } from './useQuizPage';


const QuizPage: FC = () => {
    const { store, isLoading, isCompletedOnce } = useQuizPage();

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
