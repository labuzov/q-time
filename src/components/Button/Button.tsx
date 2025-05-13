
import classNames from 'classnames';
import { ComponentProps, PropsWithChildren } from 'react';

import styles from './Button.module.scss';
import { ButtonVariant } from './types';


type ButtonProps = PropsWithChildren & ComponentProps<'button'> & {
    variant?: ButtonVariant;
};

export const Button: React.FC<ButtonProps> = ({
    className, variant, children, ...props
}) => {

    const classes = classNames(
        styles.button,
        variant === 'outline' && styles.variantOutline,
        variant === 'outlineSecondary' && styles.variantOutlineSecondary,
        variant === 'text' && styles.variantText,
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
