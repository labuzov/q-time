import { Container } from '@/components/Container';
import { FC } from 'react';
import { Preview } from './Preview/Preview';
import { Quiz } from './Quiz/Quiz';


const QuizPage: FC = () => {

    return ( 
        // <Preview title='Название' description='Какое-то описание' src='https://uploads.yasno.live/uploads/psy_test/cover_photo/241/large_2x_Опенер.png' />
        <Quiz />
    );
}

export default QuizPage;
