import { FC } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';

import { Image } from '@/components/Image';

import styles from './QuizItem.module.scss';


type Props = {
    title: string;
    description: string;
    src: string;
}

export const QuizItem: FC<Props> = ({ title, description, src }) => {

    return ( 
        <Link
            className={styles.wrapper}
            to={ROUTES.quiz.get('someid')}
        >
            <div className={styles.image}>
                <Image src={src} />
            </div>
            <div className={styles.content}>
                <div className={styles.title}>{title}</div>
                <div className={styles.description}>{description}</div>
            </div>
        </Link>
    );
}
