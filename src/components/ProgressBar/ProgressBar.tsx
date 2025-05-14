import { FC } from 'react';

import styles from './ProgressBar.module.scss';


type Props = {
    progress?: number;
}

export const ProgressBar: FC<Props> = ({ progress }) => {
    const getProgressValue = () => {
        if (!progress || progress < 0) return '0%';
        if (progress > 100) return '100%';

        return progress + '%';
    }

    const progressValue = getProgressValue();

    return (
        <div className={styles.progress}>
            <div className={styles.progressDone} style={{ width: progressValue }}>
                <div className={styles.progressPercent}>
                    {progressValue}
                </div>
            </div>
        </div>
    );
}
