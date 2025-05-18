import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';

import { ModalProps, ModalBase } from '..';
import { ModalHeader } from '../ModalHeader';
import { ModalContent } from '../ModalContent';

import styles from './AuthModal.module.scss';
import { Input } from '@/components/FormControls/Input';
import { FeedbackWrapper } from '@/components/Form/Feedback/FeedbackWrapper';
import { Label } from '@/components/Form/Label';
import { FcGoogle } from 'react-icons/fc';
import { Row } from '@/components/Form/Row';
import { LoginForm } from './Forms/LoginForm/LoginForm';


type Props = ModalProps & {
    message?: string;
    cancelButtonText?: string;
    confirmButtonText?: string;
    onLogin?: () => void;
}

export const AuthModal: React.FC<Props> = ({
    message, cancelButtonText, confirmButtonText, onClose, ...props
}) => {
    const handleCancel = () => {
        onClose?.(false);
    }

    return (
        <ModalBase onClose={handleCancel} width={540} {...props}>
            <ModalHeader
                onClose={handleCancel}
            />
            <ModalContent>
                <div className={styles.content}>
                    <LoginForm />
                </div>
            </ModalContent>
        </ModalBase>
    );
}
