import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';

import { ModalProps, ModalBase } from '..';
import { ModalHeader } from '../ModalHeader';
import { ModalContent } from '../ModalContent';
import { ModalFooter } from '../ModalFooter';

import styles from './AuthModal.module.scss';
import { Input } from '@/components/FormControls/Input';
import { Feedback } from '@/components/Form/Feedback';
import { FeedbackWrapper } from '@/components/Form/Feedback/FeedbackWrapper';
import { Label } from '@/components/Form/Label';


type Props = ModalProps & {
    message?: string;
    cancelButtonText?: string;
    confirmButtonText?: string;
    onLogin?: () => void;
}

export const AuthModal: React.FC<Props> = ({
    message, cancelButtonText, confirmButtonText, onClose, ...props
}) => {
    const handleConfirm = () => {
        onClose?.(true);
    }

    const handleCancel = () => {
        onClose?.(false);
    }

    return (
        <ModalBase onClose={onClose} {...props}>
            <ModalHeader
                onClose={handleCancel}
            >
                <Typography textId="modal.auth.title" />
            </ModalHeader>
            <ModalContent>
                <Typography className={styles.text} textId={'modal.auth.login.text'} />

                <Label>
                    Логин
                </Label>
                <FeedbackWrapper>
                    <Input />
                </FeedbackWrapper>
            </ModalContent>
        </ModalBase>
    );
}
