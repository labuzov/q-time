import { FC } from 'react';
import classNames from 'classnames';

import { Quiz } from '@/@types/quiz';

import { Image } from '@/components/Image';

import styles from './QuizCard.module.scss';


type Props = {
    quiz: Quiz;
    isHoverAnimationDisabled?: boolean;
}

export const QuizCard: FC<Props> = ({ quiz, isHoverAnimationDisabled }) => {
    const { title, description, image } = quiz;

    return (
        <div className={classNames(styles.card, !isHoverAnimationDisabled && styles.cardHover)}>
            <div className={styles.image}>
                <Image src={image ?? ''} />
            </div>
            <div className={styles.content}>
                <div className={styles.title}>{title}</div>
                <div className={styles.description}>{description}</div>
            </div>
        </div>
    );
}
