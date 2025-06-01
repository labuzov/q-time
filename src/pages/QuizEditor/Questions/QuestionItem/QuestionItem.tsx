import { FC } from 'react';
import { MdDeleteOutline, MdOutlineModeEditOutline } from 'react-icons/md';

import { Typography } from '@/components/Typography';
import { Button } from '@/components/Button';

import styles from './QuestionItem.module.scss';
import { QuestionDto } from '@/@types/quiz';


type Props = {
    question: QuestionDto;
    onRemove: () => void;
    onEdit: () => void;
}

export const QuestionItem: FC<Props> = ({
    question, onRemove, onEdit
}) => {
    

    return ( 
        <div className={styles.question}>
            <div className={styles.info}>
                <Typography className={styles.title}>
                    {question.title}
                </Typography>
                <Typography className={styles.subtitle}>
                    {question.answers?.find(({ isCorrect }) => isCorrect)?.title ?? ''}
                </Typography>
            </div>

            <div className={styles.actions}>
                <Button
                    className={styles.actionsItem}
                    onClick={onEdit}
                >
                    <MdOutlineModeEditOutline />
                </Button>
                <Button
                    className={styles.actionsItem}
                    variant="secondary"
                    onClick={onRemove}
                >
                    <MdDeleteOutline />
                </Button>
            </div>

        </div>
    );
}
