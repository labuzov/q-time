
import classNames from 'classnames';
import { ComponentProps, PropsWithChildren } from 'react';

import styles from './Button.module.scss';
import { ButtonVariant } from './types';


export type ButtonProps = PropsWithChildren & ComponentProps<'button'> & {
    variant?: ButtonVariant;
};

export const Button: React.FC<ButtonProps> = ({
    className, variant, children, ...props
}) => {

    const classes = classNames(
        styles.button,
        variant && styles[variant],
        className
    );

    return (
        <button
            className={classes}
            {...props}
        >
            {children}
        </button>
    );
}
