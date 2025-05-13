import { OverlayComponentsContainer } from '@/components/OverlayComponents/OverlayComponentsContainer';
import { ErrorBoundary } from '@/components/ErrorBoundary';

import './styles/App.scss';

import HomePage from '@/pages/Home/HomePage';


const App = () => {

    return (
        <ErrorBoundary>
            <OverlayComponentsContainer />
            <HomePage />
        </ErrorBoundary>
    );
}

export default App;
