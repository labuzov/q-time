import { PropsWithChildren } from 'react';

import styles from './Modal.module.scss';


type Props = PropsWithChildren & {
    
}

export const ModalContent: React.FC<Props> = ({ children }) => {

    return (
        <div className={styles.modalContent}>
            {children}
        </div>
    );
}
