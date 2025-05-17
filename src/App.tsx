import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';
import { onAuthStateChanged } from 'firebase/auth';

import { useAuthStore } from '@/stores/AuthStore';
import { ROUTES } from '@/constants/routes';

import { OverlayComponentsContainer } from '@/components/OverlayComponents/OverlayComponentsContainer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Loading } from '@/components/Loading';
import { NotFoundPage } from '@/pages/Errors/404NotFoundPage';

import { firebaseAuth } from './firebaseConfig';
import { Layout } from './components/Layout';
import './styles/App.scss';

const HomePage = lazy(() => import('@/pages/Home/HomePage'));
const QuizPage = lazy(() => import('@/pages/Quiz/QuizPage'));

const App = () => {
    const { isInit, handleAuthStateChanged } = useAuthStore(useShallow(({
        isInit, handleAuthStateChanged
    }) => ({
        isInit, handleAuthStateChanged
    })));

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, handleAuthStateChanged);

        return () => {
            unsubscribe();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isAppInit = isInit;

    return (
        <ErrorBoundary>
            <OverlayComponentsContainer />

            {isAppInit ? (
                <Layout>
                    <Suspense fallback={<Loading fillContainer />}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />

                            <Route path={ROUTES.quiz.path} element={<QuizPage />} />

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
