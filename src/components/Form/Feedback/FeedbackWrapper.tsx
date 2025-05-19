import { FC, PropsWithChildren } from 'react';

import { Feedback } from './Feedback';


type Props = PropsWithChildren & {
    errors?: string[] | string;
};

export const FeedbackWrapper: FC<Props> = ({ errors, children }) => {
    const renderFeedback = () => {
        const errorsArray: string[] = [];

		if (!errors?.length) return null;
        
        if (typeof errors === 'string') errorsArray.push(errors);
        if (Array.isArray(errors)) errorsArray.push(...errors);

		return (
            <>
                {errorsArray.map(error => (
                    <Feedback key={error}>
                        {error}
                    </Feedback>
                ))}
            </>
		)
	}

    return (
        <>
            {children}
            {renderFeedback()}
        </>
    );
};
