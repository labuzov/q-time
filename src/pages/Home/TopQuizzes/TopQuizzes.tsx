import { FC } from 'react';

import { Breakpoints } from '@/constants/screen';
import { Quiz } from '@/@types/quiz';

import { Container } from '@/components/Container';
import { Typography } from '@/components/Typography';
import { InViewAnimation } from '@/components/InViewAnimation';
import { QuizLink, QuizList } from '@/components/QuizList';
import { Loading } from '@/components/Loading';

import styles from './TopQuizzes.module.scss';


type Props = {
    quizzes: Quiz[];
    isLoading?: boolean;
}

export const TopQuizzes: FC<Props> = ({ quizzes, isLoading }) => {

    return (
        <Container maxWidth={Breakpoints.L}>
            <div className={styles.content}>
                <div className={styles.text}>
                    <InViewAnimation variant="translateLeft">
                        <Typography textId="home.quiz.list.text" variant="h2" />
                    </InViewAnimation>
                </div>
                <div className={styles.list}>
                    {isLoading ? (
                        <Loading fillContainer />
                    ) : (
                        <QuizList
                            quizzes={quizzes}
                            itemRender={quiz => <QuizLink quiz={quiz} />}
                        />
                    )}
                </div>
            </div>
        </Container>
    );
}
