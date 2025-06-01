import { ComponentProps, FC } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './Input.module.scss';


export type InputProps = ComponentProps<'input'> & {
	isInvalid?: boolean;
};

export const Input: FC<InputProps> = ({ className, isInvalid, placeholder, ...props }) => {
	const { t } = useTranslation();

	return (
		<input
			{...props}
			placeholder={placeholder ? t(placeholder) : ''}
			className={classNames(
				styles.input,
				isInvalid && styles.invalid,
				className
			)}
		/>
	);
};
