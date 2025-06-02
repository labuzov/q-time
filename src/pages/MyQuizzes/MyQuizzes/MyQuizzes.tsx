import { FC } from 'react';

import { Quiz } from '@/@types/quiz';

import { Loading } from '@/components/Loading';
import { QuizList, QuizWithActions } from '@/components/QuizList';

import styles from './MyQuizzes.module.scss';
import { InViewAnimation } from '@/components/InViewAnimation';
import { Typography } from '@/components/Typography';


type Props = {
    quizzes: Quiz[];
    isLoading?: boolean;
    onEditClick: (id: string) => void;
    onDeleteClick: (id: string, title: string) => void;
}

export const MyQuizzes: FC<Props> = ({ quizzes, isLoading, onEditClick, onDeleteClick }) => {
    const renderContent = () => {
        if (isLoading) return (
            <Loading fillContainer />
        );

        if (!quizzes.length) return (
            <InViewAnimation className={styles.noContent} variant="scale" duration={0.3}>
                <div className={styles.text}>
                    <Typography textId="myQuizzes.noContent" />
                </div>
            </InViewAnimation>
        )

        return (
            <QuizList
                quizzes={quizzes}
                itemRender={quiz => (
                    <QuizWithActions
                        quiz={quiz}
                        onEditClick={() => onEditClick(quiz.id)}
                        onDeleteClick={() => onDeleteClick(quiz.id, quiz.title)}
                    />
                )}
            />
        )
    }

    return (
        <div className={styles.content}>
            {renderContent()}
        </div>
    );
}
