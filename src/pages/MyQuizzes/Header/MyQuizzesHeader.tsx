import { FC } from 'react';

import { Typography } from '@/components/Typography';
import { InViewAnimation } from '@/components/InViewAnimation';
import { Button } from '@/components/Button';

import styles from './MyQuizzesHeader.module.scss';


type Props = {
    onCreateClick: () => void;
}

export const MyQuizzesHeader: FC<Props> = ({ onCreateClick }) => {

    return (
        <InViewAnimation className={styles.header} variant="opacity">
            <div className={styles.text}>
                <Typography textId="myQuizzes.title" variant="h3" />
            </div>

            <div className={styles.actions}>
                <Button
                    onClick={onCreateClick}
                >
                    <Typography textId="myQuizzes.actions.create"  />
                </Button>
            </div>
        </InViewAnimation>
    );
}
