import React from 'react';
import { IconType } from 'react-icons';

import styles from './IconButton.module.scss';


const DEFAULT_SIZE = 40;

type IconButtonProps = {
    size?: number;
    Icon: IconType;
    onClick?: () => void | Promise<void>;
};

export const IconButton: React.FC<IconButtonProps> = ({ size, Icon, onClick }) => {
    const handleClick = (e: React.UIEvent) => {
        e.stopPropagation();
        onClick?.();
    }

    const getSizes = () => {
        const width = (size ?? DEFAULT_SIZE) + 'px';
        const height = (size ?? DEFAULT_SIZE) + 'px';

        return { width, height }
    }

    return (
        <div className={styles.button} style={getSizes()} onClick={handleClick}>
            {<Icon />}
        </div>
    );
}
