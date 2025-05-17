import { FC, useEffect, useMemo, useState } from 'react';

import { Breakpoints } from '@/constants/screen';
import { quizApi } from '@/api/quizApi';
import { Quiz } from '@/@types/quiz';

import { Container } from '@/components/Container';
import { Typography } from '@/components/Typography';
import { InViewAnimation } from '@/components/InViewAnimation';

import { QuizItem } from './QuizItem/QuizItem';
import styles from './QuizList.module.scss';


export const QuizList: FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);

    useEffect(() => {
        loadQuizzes();
    }, []);

    const loadQuizzes = async () => {
        const data = await quizApi.getQuizzes();
        setQuizzes(data ?? []);
    }

    const quizItems = useMemo(() => quizzes.map(quiz => {
        return <QuizItem key={quiz.id} quiz={quiz} />;
    }), [quizzes]);

    return ( 
        <Container maxWidth={Breakpoints.L}>
            <div className={styles.content}>
                <div className={styles.text}>
                    <InViewAnimation variant="translateLeft">
                        <Typography textId="home.quiz.list.text" variant="h2" />
                    </InViewAnimation>
                </div>
                <div className={styles.list}>
                    {quizItems}
                </div>
            </div>
        </Container>
    );
}
