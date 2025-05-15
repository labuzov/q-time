import { FC } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { Quiz } from '@/@types/quiz';

import { Image } from '@/components/Image';

import styles from './QuizItem.module.scss';


type Props = {
    quiz: Quiz;
}

export const QuizItem: FC<Props> = ({ quiz }) => {
    const { id, title, description, image } = quiz;

    return ( 
        <Link
            className={styles.wrapper}
            to={ROUTES.quiz.get(id)}
        >
            <div className={styles.image}>
                <Image src={image} />
            </div>
            <div className={styles.content}>
                <div className={styles.title}>{title}</div>
                <div className={styles.description}>{description}</div>
            </div>
        </Link>
    );
}
