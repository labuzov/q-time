import { ComponentProps, PropsWithChildren } from 'react';
import classNames from 'classnames';

import styles from './Modal.module.scss';


type Props = PropsWithChildren & ComponentProps<'div'>;

export const ModalContent: React.FC<Props> = ({ className, children, ...props }) => {

    return (
        <div className={classNames(styles.modalContent, className)} {...props}>
            {children}
        </div>
    );
}
