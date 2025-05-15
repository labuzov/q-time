import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserAnswer } from '@/stores/QuizStore';
import { Breakpoints } from '@/constants/screen';
import { Question } from '@/@types/quiz';

import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';
import { Container } from '@/components/Container';

import styles from './Result.module.scss';


type Props = {
    questions: Question[];
    userAnswers: UserAnswer[];
}

export const Result: FC<Props> = ({ questions, userAnswers }) => {
    const navigate = useNavigate();

    const handleGoHomeClick = () => {
        navigate('/');
    }

    const getCorrectCount = () => {
        let count = 0;

        for (const question of questions) {
            const answer = userAnswers.find(({ questionId }) => questionId === question.id);
            if (!answer) continue;

            const isCorrect = question.answers.find(({ id, isCorrect }) => isCorrect && id === answer.value[0]);
            if (isCorrect) count++;
        }

        return count;
    }

    return (
        <Container maxWidth={Breakpoints.M} className={styles.container}>
            {/* <div className={styles.image}>
                <Image src={src} />
            </div> */}

            <div className={styles.content}>
                <Typography
                    textId="quiz.result.text"
                    textOptions={{ correct: getCorrectCount(), count: questions.length }}
                    className={styles.result}
                    variant="h3"
                />
            </div>

            <div className={styles.actions}>
                <Button
                    onClick={handleGoHomeClick}
                >
                    <Typography textId="quiz.button.goHome" />
                </Button>
            </div>
        </Container>
    );
}
