import { ComponentProps, FC, PropsWithChildren } from 'react';
import { MdCheckCircleOutline, MdErrorOutline, MdInfoOutline, MdOutlineWarning } from 'react-icons/md';
import classNames from 'classnames';

import { AlertVariant } from './types';
import styles from './Alert.module.scss';


type Props = PropsWithChildren & ComponentProps<'div'> & {
    variant: AlertVariant;
};

export const Alert: FC<Props> = ({ variant, className, children }) => {
    const renderIcon = () => {
        switch (variant) {
            case 'error': return <MdErrorOutline />;
            case 'info': return <MdInfoOutline />;
            case 'success': return <MdCheckCircleOutline />;
            case 'warning': return <MdOutlineWarning />;
            default: return null;
        }
    }

    return (
        <div
            className={classNames(styles.alert, styles[variant], className)}
        >
            <div className={styles.icon}>
                {renderIcon()}
            </div>
            {children}
        </div>
    );
};
