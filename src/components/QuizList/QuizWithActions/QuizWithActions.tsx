import { FC } from 'react';
import classNames from 'classnames';
import { MdDeleteOutline, MdModeEditOutline } from 'react-icons/md';

import { Quiz } from '@/@types/quiz';

import { InViewAnimation } from '@/components/InViewAnimation';
import { Button } from '@/components/Button';

import { QuizCard } from '../QuizCard/QuizCard';
import styles from './QuizWithActions.module.scss';


type Props = {
    quiz: Quiz;
    onEditClick?: () => void;
    onDeleteClick?: () => void;
}

export const QuizWithActions: FC<Props> = ({ quiz, onEditClick, onDeleteClick }) => {

    return (
        <InViewAnimation className={styles.wrapper} variant="scale" duration={0.3}>
            <QuizCard quiz={quiz} isHoverAnimationDisabled />

            <div className={styles.actions}>
                <Button
                    className={classNames(styles.actionsItem, styles.actionsEdit)}
                    variant="icon"
                    onClick={onEditClick}
                >
                    <MdModeEditOutline />
                </Button>
                <Button
                    className={classNames(styles.actionsItem, styles.actionsDelete)}
                    variant="icon"
                    onClick={onDeleteClick}
                >
                    <MdDeleteOutline />
                </Button>
            </div>
        </InViewAnimation>
    );
}
