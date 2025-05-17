import classNames from 'classnames';

import { InViewAnimation } from '@/components/InViewAnimation';

import { OverlayComponentBase } from '../types';
import styles from './Modal.module.scss';


const DEFAULT_WIDTH = 500;

export type ModalProps = OverlayComponentBase & {
    className?: string;
    width?: number;
    isLoading?: boolean;
    children?: React.ReactNode;
}

export const ModalBase: React.FC<ModalProps> = ({
    className, width, children, onClose
}) => {
    const handleClose = () => {
        onClose?.();
    }

    return (
        <InViewAnimation variant="opacity" duration={0.1} className={styles.container}>
            <div className={styles.backdrop} onClick={handleClose} />
            <div
                className={classNames(styles.modal, className)}
                style={{ maxWidth: width || DEFAULT_WIDTH }}
            >
                {children}
            </div>
        </InViewAnimation>
    );
}
