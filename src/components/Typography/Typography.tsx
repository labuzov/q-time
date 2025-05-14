import { HTMLProps, FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { TOptions } from 'i18next';
import classNames from 'classnames';

import { TypographyVariant } from './types';
import styles from './Typography.module.scss';


type Props = HTMLProps<HTMLDivElement> & PropsWithChildren & {
    textId?: string;
    variant?: TypographyVariant;
    textOptions?: TOptions;
}

export const Typography: FC<Props> = ({ textId, variant, textOptions, className, children, ...props }) => {
    const { t } = useTranslation();

    return ( 
        <div
            {...props}
            className={classNames(
                className,
                variant && styles[variant],
            )}
        >
            {!!textId && (
                <>
                    {t(textId, textOptions)}
                </>
            )}
            {children}
        </div>
    );
}
