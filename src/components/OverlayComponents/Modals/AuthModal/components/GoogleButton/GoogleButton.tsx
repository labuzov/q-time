import { FcGoogle } from 'react-icons/fc';

import { Typography } from '@/components/Typography';
import { Button, ButtonProps } from '@/components/Button';

import styles from './GoogleButton.module.scss';


type Props = ButtonProps;

export const GoogleButton: React.FC<Props> = (props) => {

    return (
        <Button
            className={styles.button}
            variant="outlineSecondary"
            {...props}
        >
            <>
                <FcGoogle />
                <Typography textId="modal.auth.google" />
            </>
        </Button>
    );
}
