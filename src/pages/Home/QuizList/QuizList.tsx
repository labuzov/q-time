import { FC } from 'react';

import { Breakpoints } from '@/constants/screen';

import { Container } from '@/components/Container';
import { Typography } from '@/components/Typography';

import styles from './QuizList.module.scss';
import { QuizItem } from './QuizItem/QuizItem';


export const QuizList: FC = () => {

    return ( 
        <Container maxWidth={Breakpoints.L} className={styles.container}>
            <div className={styles.text}>
                <Typography textId="home.quiz.list.text" />
            </div>
            <div className={styles.list}>
                <QuizItem title='Какое-то название' description='Какой-то дескрипшен' src='https://uploads.yasno.live/uploads/psy_test/cover_photo/241/large_2x_Опенер.png' />
                <QuizItem title='Какое-то название' description='Какой-то дескрипшен' src='https://uploads.yasno.live/uploads/psy_test/cover_photo/241/large_2x_Опенер.png' />
                <QuizItem title='Какое-то название' description='Какой-то дескрипшен' src='https://uploads.yasno.live/uploads/psy_test/cover_photo/241/large_2x_Опенер.png' />
                <QuizItem title='Какое-то название' description='Какой-то дескрипшен' src='https://uploads.yasno.live/uploads/psy_test/cover_photo/241/large_2x_Опенер.png' />
            </div>
        </Container>
    );
}
