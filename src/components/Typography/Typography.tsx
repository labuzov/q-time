import { HTMLProps, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TOptions } from 'i18next';

import { i18nNamespace } from '@/i18n';


type Props = HTMLProps<HTMLDivElement> & {
    textId?: string;
    ns?: i18nNamespace;
    textOptions?: TOptions;
}

export const Typography: FC<Props> = ({ textId, ns, textOptions, ...props }) => {
    const { t } = useTranslation();

    return ( 
        <div {...props}>
            {t(textId ?? '', { ns, ...textOptions })}
        </div>
    );
}
