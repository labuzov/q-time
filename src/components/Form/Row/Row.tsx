import { ComponentProps, PropsWithChildren } from 'react';
import classNames from 'classnames';

import styles from './Row.module.scss';


type Props = ComponentProps<'div'> & PropsWithChildren;

export const Row: React.FC<Props> = ({ className, children, ...props }) => {
    const classes = classNames(
        styles.row,
        className
    );

    return ( 
        <div {...props} className={classes}>
            {children}
        </div>
    );
}
