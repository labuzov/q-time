import { CSSProperties, FC } from 'react';
import classNames from 'classnames';

import styles from './Skeleton.module.scss';


type SkeletonProps = {
    width?: number | string;
    height?: number | string;
    className?: string;
    style?: CSSProperties;
}

export const Skeleton: FC<SkeletonProps> = ({ width, height, className, style }) => {

    return (
        <div className={classNames(styles.skeleton, className)} style={{ width, height, ...style }} />
    );
}
