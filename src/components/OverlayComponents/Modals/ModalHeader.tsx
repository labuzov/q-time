import { PropsWithChildren } from 'react';
import { MdClose } from 'react-icons/md';

import styles from './Modal.module.scss';


type Props = PropsWithChildren & {
    onClose?: () => void;
}

export const ModalHeader: React.FC<Props> = ({ children, onClose }) => {

    return (
        <div className={styles.modalHeader}>
            <div className={styles.title}>{children}</div>
            <button className={styles.icon} onClick={onClose}>
                <MdClose />
            </button>
        </div>
    );
}
