import { Typography } from '@/components/Typography';
import { Alert, AlertVariant } from '@/components/Alert';

import styles from './OperationAlert.module.scss';


type Props = {
    textId?: string;
    variant: AlertVariant;
};

export const OperationAlert: React.FC<Props> = ({ textId, variant }) => {
    if (!textId) return null;

    return (
        <Alert variant={variant} className={styles.alert}>
            <Typography textId={textId} />
        </Alert>
    );
}
