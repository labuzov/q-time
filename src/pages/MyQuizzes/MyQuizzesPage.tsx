import { FC } from 'react';

import { Breakpoints } from '@/constants/screen';

import { Container } from '@/components/Container';

import { useMyQuizzesPage } from './useMyQuizzesPage';
import { MyQuizzesHeader } from './Header/MyQuizzesHeader';
import { MyQuizzes } from './MyQuizzes/MyQuizzes';
import styles from './MyQuizzesPage.module.scss';


const MyQuizzesPage: FC = () => {
    const { quizzes, isLoading, createQuiz, editQuiz, deleteQuiz } = useMyQuizzesPage();

    return ( 
        <div className={styles.wrapper}>
            <Container maxWidth={Breakpoints.L}>
                <MyQuizzesHeader
                    onCreateClick={createQuiz}
                />

                <MyQuizzes
                    quizzes={quizzes}
                    isLoading={isLoading}
                    onEditClick={editQuiz}
                    onDeleteClick={deleteQuiz}
                />
            </Container>
        </div>
    );
}

export default MyQuizzesPage;
