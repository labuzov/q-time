import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';

import i18n from './i18n/i18n.ts';
import App from './App.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <I18nextProvider i18n={i18n}>
            <App />
        </I18nextProvider>
    </BrowserRouter>,
);
