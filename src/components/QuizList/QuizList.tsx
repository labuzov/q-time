import { FC, JSX, useMemo } from 'react';

import { Quiz } from '@/@types/quiz';

import styles from './QuizList.module.scss';


type Props = {
    quizzes: Quiz[];
    itemRender: (quiz: Quiz) => JSX.Element;
}

export const QuizList: FC<Props> = ({ quizzes, itemRender }) => {

    const quizItems = useMemo(() => quizzes.map(quiz => (
        <div key={quiz.id} className={styles.item}>
            {itemRender(quiz)}
        </div>
    )), [quizzes]);

    return ( 
        <div className={styles.list}>
            {quizItems}
        </div>
    );
}
