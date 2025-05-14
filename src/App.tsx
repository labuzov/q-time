import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';

import { OverlayComponentsContainer } from '@/components/OverlayComponents/OverlayComponentsContainer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Loading } from '@/components/Loading';

import './styles/App.scss';

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

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Suspense>
        </ErrorBoundary>
    );
}

export default App;
