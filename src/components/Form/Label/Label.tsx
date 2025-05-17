import { ComponentProps, PropsWithChildren } from 'react';
import classNames from 'classnames';

import styles from './Label.module.scss';


type Props = ComponentProps<'div'> & PropsWithChildren;

export const Label: React.FC<Props> = ({ className, children, ...props }) => {
    const classes = classNames(
        styles.label,
        className
    );

    return ( 
        <div {...props} className={classes}>
            {children}
        </div>
    );
}
