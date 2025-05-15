import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';

import { OverlayComponentsContainer } from '@/components/OverlayComponents/OverlayComponentsContainer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Loading } from '@/components/Loading';

import './styles/App.scss';
import { NotFoundPage } from '@/pages/Errors/404NotFoundPage';

const HomePage = lazy(() => import('@/pages/Home/HomePage'));
const QuizPage = lazy(() => import('@/pages/Quiz/QuizPage'));

const App = () => {

    return (
        <ErrorBoundary>
            <OverlayComponentsContainer />

            <Suspense fallback={<Loading fillContainer />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />

                    <Route path={ROUTES.quiz.path} element={<QuizPage />} />

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </ErrorBoundary>
    );
}

export default App;
