import { FC } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { Quiz } from '@/@types/quiz';

import { Image } from '@/components/Image';
import { InViewAnimation } from '@/components/InViewAnimation';

import styles from './QuizItem.module.scss';


const defaultImgUrl = 'https://bogatyr.club/uploads/posts/2023-03/26188/1678994928_bogatyr-club-p-fon-dlya-testa-foni-vkontakte-15.png';

type Props = {
    quiz: Quiz;
}

export const QuizItem: FC<Props> = ({ quiz }) => {
    const { id, title, description, image } = quiz;

    return (
        <InViewAnimation className={styles.wrapper} variant="translateTop">
            <Link to={ROUTES.quiz.get(id)}>
                <div className={styles.image}>
                    <Image src={image || defaultImgUrl} />
                </div>
                <div className={styles.content}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.description}>{description}</div>
                </div>
            </Link>
        </InViewAnimation>
    );
}
