import { ComponentProps, FC } from 'react';
import classNames from 'classnames';

import styles from './Input.module.scss';


export type InputProps = ComponentProps<'input'> & {
	invalid?: boolean;
};

export const Input: FC<InputProps> = ({ className, invalid, ...props }) => {

	return (
		<input
			{...props}
			className={classNames(
				styles.input,
				invalid && styles.invalid,
				className
			)}
		/>
	);
};
