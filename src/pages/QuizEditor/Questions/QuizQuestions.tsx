import { FC } from 'react';

import { QuestionDto } from '@/@types/quiz';
import { useOverlayComponentsStore } from '@/stores/OverlayComponentsStore';

import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';
import { QuizQuestionModal, QuizQuestionModalProps } from '@/components/OverlayComponents/Modals/QuizQuestionModal/QuizQuestionModal';

import { QuestionItem } from './QuestionItem/QuestionItem';
import styles from './QuizQuestions.module.scss';


type Props = {
    questions: QuestionDto[];
    onAdd: (question: QuestionDto) => void;
    onRemove: (questionIndex: number) => void;
    onEdit: (questionIndex: number, question: QuestionDto) => void;
}

export const QuizQuestions: FC<Props> = ({
    questions, onAdd, onEdit, onRemove
}) => {
    const { showComponent } = useOverlayComponentsStore();

    const handleAddClick = async () => {
        const question = await showComponent<QuizQuestionModalProps, QuestionDto>(QuizQuestionModal);
        if (!question) return;

        onAdd(question);
    }

    const handleEditClick = async (questionIndex: number, question: QuestionDto) => {
        const editedQuestion = await showComponent<QuizQuestionModalProps, QuestionDto>(QuizQuestionModal, { question });
        if (!editedQuestion) return;

        onEdit(questionIndex, editedQuestion);
    }

    const handleRemoveClick = (questionIndex: number) => {
        onRemove(questionIndex);
    }

    return ( 
        <div className={styles.questions}>
            <div className={styles.paper}>
                <Typography textId="editor.questions.title" variant="h5" className={styles.title} />

                {questions.map((question, index) => (
                    <QuestionItem
                        key={question.title + index}
                        question={question}
                        onEdit={() => handleEditClick(index, question)}
                        onRemove={() => handleRemoveClick(index)}
                    />
                ))}

                <div className={styles.actions}>
                    <Button variant="secondary" onClick={handleAddClick}>
                        <Typography textId="editor.button.addQuestion" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
