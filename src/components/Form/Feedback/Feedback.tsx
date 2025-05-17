import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';

import styles from './Feedback.module.scss';


type Props = PropsWithChildren & {
	className?: string;
};

export const Feedback: FC<Props> = ({ className, children }) => {

	return (
		<div className={classNames(styles.feedback, className)}>
            {children}
        </div>
	);
};
