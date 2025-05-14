import { FC } from 'react';

import { Breakpoints } from '@/constants/screen';

import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';
import { Container } from '@/components/Container';
import { ProgressBar } from '@/components/ProgressBar';

import styles from './Quiz.module.scss';


type Props = {
    
}

export const Quiz: FC<Props> = ({ }) => {

    return (
        <Container maxWidth={Breakpoints.M} className={styles.container}>
            <Typography className={styles.title} variant="h2">Название квиза</Typography>
            <Typography className={styles.questionNumber}>Вопрос 1/7</Typography>

            <ProgressBar progress={90} />

            <div className={styles.card}>
                <Typography variant="h3" className={styles.cardTitle}>1. Название вопроса</Typography>

                <div className={styles.cardContent}>
                    <div className={styles.cardAnswer}>
                        <div className={styles.cardAnswerCheckbox} />
                        <Typography className={styles.cardAnswerText}>Ответ 1</Typography>
                    </div>
                    <div className={styles.cardAnswer}>
                        <div className={styles.cardAnswerCheckbox} />
                        <Typography className={styles.cardAnswerText}>Ответ 1</Typography>
                    </div>
                    <div className={`${styles.cardAnswer} ${styles.cardAnswerSelected}`}>
                        <div className={styles.cardAnswerCheckbox} />
                        <Typography className={styles.cardAnswerText}>Ответ 1</Typography>
                    </div>
                    <div className={styles.cardAnswer}>
                        <div className={styles.cardAnswerCheckbox} />
                        <Typography className={styles.cardAnswerText}>Ответ 1</Typography>
                    </div>
                </div>
            </div>

            <div className={styles.actions}>
                <Button
                    
                >
                    <Typography textId="quiz.button.next" />
                </Button>
            </div>
        </Container>
    );
}
