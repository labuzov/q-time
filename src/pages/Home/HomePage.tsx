import { FC } from 'react';

import { Welcome } from './Welcome/Welcome';
import { QuizList } from './QuizList/QuizList';
import { Footer } from './Footer/Footer';


const HomePage: FC = () => {

    return ( 
        <div>
            <Welcome />

            <QuizList />

            <Footer />
        </div>
    );
}

export default HomePage;
