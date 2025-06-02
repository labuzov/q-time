import { FC } from 'react';

import { Welcome } from './Welcome/Welcome';
import { TopQuizzes } from './TopQuizzes/TopQuizzes';
import { Footer } from './Footer/Footer';
import { useHomePage } from './useHomePage';


const HomePage: FC = () => {
    const { quizzes, isQuizListLoading } = useHomePage();

    return ( 
        <div>
            <Welcome />

            <TopQuizzes
                quizzes={quizzes}
                isLoading={isQuizListLoading}
            />

            <Footer />
        </div>
    );
}

export default HomePage;
