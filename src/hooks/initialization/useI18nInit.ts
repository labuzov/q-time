import { useEffect, useState } from 'react';
import { InitOptions } from 'i18next';

import i18n from '@/i18n/i18n';
import { firebaseAuth } from '@/firebaseConfig';


export const useI18nInit = () => {
    const [isI18nInit, setIsI18nInit] = useState(!!i18n.isInitialized);

    useEffect(() => {
        i18n.on('initialized', handleInitChange);
        i18n.on('languageChanged', handleLangChange);

        return () => {
            i18n.off('initialized', handleInitChange);
            i18n.off('languageChanged', handleLangChange);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInitChange = (options: InitOptions) => {
        setIsI18nInit(true);

        if (options.lng) {
            firebaseAuth.languageCode = options.lng;
        };
    }

    const handleLangChange = (options: InitOptions) => {
        if (!options.lng) return;

        firebaseAuth.languageCode = options.lng;
    }

    return { isI18nInit };
}
