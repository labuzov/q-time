import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

import { OverlayComponentsContainer } from '@/components/OverlayComponents/OverlayComponentsContainer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Loading } from '@/components/Loading';
import { NotFoundPage } from '@/pages/Errors/404NotFoundPage';
import { ForbiddenPage } from '@/pages/Errors/403ForbiddenPage';
import { useI18nInit } from '@/hooks/initialization/useI18nInit';
import { useAuthInit } from '@/hooks/initialization/useAuthInit';

import { Layout } from './components/Layout';
import './styles/App.scss';

const HomePage = lazy(() => import('@/pages/Home/HomePage'));
const QuizPage = lazy(() => import('@/pages/Quiz/QuizPage'));
const QuizEditorPage = lazy(() => import('@/pages/QuizEditor/QuizEditorPage'));
const MyQuizzesPage = lazy(() => import('@/pages/MyQuizzes/MyQuizzesPage'));

const App = () => {
    const { isAuthInit } = useAuthInit();
    const { isI18nInit } = useI18nInit();

    const isAppInit = isAuthInit && isI18nInit;

    return (
        <ErrorBoundary>
            <OverlayComponentsContainer />

            {isAppInit ? (
                <Layout>
                    <Suspense fallback={<Loading fillContainer />}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />

                            <Route path={ROUTES.quiz.path} element={<QuizPage />} />
                            <Route path={ROUTES.quizEditor.path} element={<QuizEditorPage />} />
                            <Route path={ROUTES.myQuizzes.path} element={<MyQuizzesPage />} />

                            <Route path={ROUTES.forbidden.path} element={<ForbiddenPage />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </Suspense>
                </Layout>
            ) : (
                <Loading fillContainer /> 
            )}

        </ErrorBoundary>
    );
}

export default App;
