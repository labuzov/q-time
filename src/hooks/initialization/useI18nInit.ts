import { useEffect, useState } from 'react';

import i18n from '@/i18n/i18n';


export const useI18nInit = () => {
    const [isI18nInit, setIsI18nInit] = useState(!!i18n.isInitialized);

    useEffect(() => {
        i18n.on('initialized', handleI18nInitChanged);

        return () => {
            i18n.off('initialized', handleI18nInitChanged);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleI18nInitChanged = () => {
        console.log('init i18n')
        setIsI18nInit(true);
    }

    return { isI18nInit };
}
