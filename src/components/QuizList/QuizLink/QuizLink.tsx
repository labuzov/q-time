import { FC } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { Quiz } from '@/@types/quiz';

import { InViewAnimation } from '@/components/InViewAnimation';

import { QuizCard } from '../QuizCard/QuizCard';
import styles from './QuizLink.module.scss';

type Props = {
    quiz: Quiz;
}

export const QuizLink: FC<Props> = ({ quiz }) => {

    return (
        <InViewAnimation className={styles.wrapper} variant="translateTop">
            <Link to={ROUTES.quiz.get(quiz.id)}>
                <QuizCard quiz={quiz} />
            </Link>
        </InViewAnimation>
    );
}
