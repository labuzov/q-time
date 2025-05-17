import { FC, PropsWithChildren } from 'react';

import { Typography } from '@/components/Typography';

import { Feedback } from './Feedback';


type Props = PropsWithChildren & {
    errors?: string[];
};

export const FeedbackWrapper: FC<Props> = ({ errors, children }) => {
    const renderFeedback = () => {
		if (!errors?.length) return null;

		return (
            <>
                {errors.map(error => (
                    <Feedback key={error}>
                        <Typography textId={error} />
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
