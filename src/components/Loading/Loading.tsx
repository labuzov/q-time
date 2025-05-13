import classNames from 'classnames';

import styles from './Loading.module.scss';


type LoadingProps = {
    className?: string;
    fillContainer?: boolean;
    fullWidth?: boolean;
    isSmall?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ className, fillContainer, fullWidth, isSmall }) => {
    const classes = classNames(
        styles.loading,
        fillContainer && styles.fillContainer,
        isSmall && styles.small,
        fullWidth && styles.fullWidth,
        className
    );

    return ( 
        <div className={classes}>
            <svg viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50" />
            </svg>
        </div>
    );
}
