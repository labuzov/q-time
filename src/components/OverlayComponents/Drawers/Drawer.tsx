import { CSSProperties, PropsWithChildren, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

import { OverlayComponentBase } from '../types';
import styles from './Drawer.module.scss';


const ANIM_DURATION = 200;

export type DrawerPosition = 'left' | 'bottom' | 'right';

export type DrawerProps = PropsWithChildren & OverlayComponentBase & {
    position?: DrawerPosition;
    bgClassName?: string;
    paperClassName?: string;
    paperStyle?: CSSProperties;
    onClose?: () => void;
};

export const Drawer: React.FC<DrawerProps> = ({ open, position, bgClassName, paperClassName, paperStyle, children, onClose }) => {
    const ref = useRef<HTMLDivElement>(null);

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
        <CSSTransition
            in={open}
            nodeRef={ref}
            timeout={ANIM_DURATION}
            unmountOnExit
            classNames={{
                enter: styles.enter,
                enterActive: styles.enterActive,
                exit: styles.exit,
                exitActive: styles.exitActive,
            }}
        >
            <div ref={ref} className={classNames(styles.drawer)}>
                <div className={classNames(styles.bg, bgClassName)} onClick={handleClose} />
                <div className={classNames(styles.paper, getPositionClassName(), paperClassName)} style={paperStyle}>
                    {children}
                </div>
            </div>
        </CSSTransition>
    );
}