import { Typography } from '@/components/Typography';

import styles from './FormHeader.module.scss';


type Props = {
    titleTextId: string;
    subtitleTextId: string;
};

export const FormHeader: React.FC<Props> = ({ titleTextId, subtitleTextId }) => {

    return (
        <div className={styles.header}>
            <Typography className={styles.title} variant="h5" textId={titleTextId} />
            <Typography className={styles.subtitle} variant="caption" textId={subtitleTextId} />
        </div>
    );
}
