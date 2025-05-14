import { FC, useState } from 'react';
import classNames from 'classnames';

import { Question, Quiz as QuizT } from '@/@types/quiz';
import { Breakpoints } from '@/constants/screen';

import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';
import { Container } from '@/components/Container';
import { ProgressBar } from '@/components/ProgressBar';

import styles from './Quiz.module.scss';


type Props = {
    quiz: QuizT;
    questions: Question[];
    currentQuestion: Question;
    currentQuestionIndex: number;
    progress: number;
    onAnswerSubmit: (answerId: string) => void;
}

export const Quiz: FC<Props> = ({
    quiz, questions, currentQuestion, currentQuestionIndex, progress, onAnswerSubmit
}) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const questionNumber = currentQuestionIndex + 1;
    const questionCount = questions.length;

    const handleSelect = (id: string) => {
        setSelectedId(id);
    }

    const handleAnswerSubmit = () => {
        if (!selectedId) return;

        onAnswerSubmit(selectedId);
        setSelectedId(null);
    }

    return (
        <Container maxWidth={Breakpoints.M} className={styles.container}>
            <Typography className={styles.title} variant="h2">{quiz.title}</Typography>
            <Typography className={styles.questionNumber}>Вопрос {questionNumber}/{questionCount}</Typography>

            <ProgressBar progress={progress} />

            <div className={styles.card}>
                <Typography variant="h3" className={styles.cardTitle}>{questionNumber}. {currentQuestion.title}</Typography>

                <div className={styles.cardContent}>
                    {currentQuestion.answers?.map(answer => (
                        <div
                            key={answer.id}
                            className={classNames(
                                styles.cardAnswer,
                                selectedId === answer.id && styles.cardAnswerSelected
                            )}
                            onClick={() => handleSelect(answer.id)}
                        >
                            <div className={styles.cardAnswerCheckbox} />
                            <Typography className={styles.cardAnswerText}>{answer.title}</Typography>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.actions}>
                <Button
                    disabled={!selectedId}
                    onClick={handleAnswerSubmit}
                >
                    <Typography textId="quiz.button.next" />
                </Button>
            </div>
        </Container>
    );
}
