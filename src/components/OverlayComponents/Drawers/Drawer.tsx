import { CSSProperties, PropsWithChildren } from 'react';
import classNames from 'classnames';

import { OverlayComponentBase } from '../types';
import styles from './Drawer.module.scss';


export type DrawerPosition = 'left' | 'bottom' | 'right';

export type DrawerProps = PropsWithChildren & OverlayComponentBase & {
    position?: DrawerPosition;
    bgClassName?: string;
    paperClassName?: string;
    paperStyle?: CSSProperties;
    onClose?: () => void;
};

export const Drawer: React.FC<DrawerProps> = ({ position, bgClassName, paperClassName, paperStyle, children, onClose }) => {
    const getPositionClassName = () => {
        switch (position) {
            case 'left': return styles.leftPos;
            case 'bottom': return styles.bottomPos;
            case 'right': return styles.rightPos;
            default: return styles.rightPos;
        }
    }

    const handleClose = () => {
        onClose?.();
    }

    return (
        <div className={classNames(styles.drawer)}>
            <div className={classNames(styles.bg, bgClassName)} onClick={handleClose} />
            <div className={classNames(styles.paper, getPositionClassName(), paperClassName)} style={paperStyle}>
                {children}
            </div>
        </div>
    );
}