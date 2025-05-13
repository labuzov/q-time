import { ComponentProps, FC, PropsWithChildren } from 'react';
import classNames from 'classnames';

import styles from './Container.module.scss';


type Props = PropsWithChildren & ComponentProps<'div'> & {
    maxWidth?: number;
};

export const Container: FC<Props> = ({ maxWidth, className, children, ...props }) => {
    const maxWidthValue = maxWidth ? `${maxWidth}px` : undefined;

    return (
        <div
            {...props}
            className={classNames(styles.container, className)}
            style={{ ...(props.style || {}), maxWidth: maxWidthValue }}
        >
            {children}
        </div>
    );
}

