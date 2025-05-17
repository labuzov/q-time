import { ComponentProps, PropsWithChildren } from 'react';
import classNames from 'classnames';

import styles from './Modal.module.scss';


type Props = PropsWithChildren &  ComponentProps<'div'>;

export const ModalFooter: React.FC<Props> = ({ children, className, ...props }) => {

    return (
        <div className={classNames(styles.modalFooter, className)} {...props}>
            <div className={styles.modalFooterInner}>
                {children}
            </div>
        </div>
    );
}
