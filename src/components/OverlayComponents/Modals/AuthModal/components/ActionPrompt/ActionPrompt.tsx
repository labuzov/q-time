import { Typography } from '@/components/Typography';

import styles from './ActionPrompt.module.scss';


type Props = {
    promptTextId: string;
    actionTextId: string;
    onClick?: () => void;
};

export const ActionPrompt: React.FC<Props> = ({ promptTextId, actionTextId, onClick }) => {

    return (
        <div className={styles.wrapper}>
            <Typography
                variant="caption"
                className={styles.prompt}
                textId={promptTextId}
            />
            <Typography
                variant="caption"
                className={styles.action}
                textId={actionTextId}
                onClick={onClick}
            />
        </div>
    );
}
