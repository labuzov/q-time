import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';

import { ModalProps, ModalBase } from '../../Modals';
import { ModalHeader } from '../ModalHeader';
import { ModalContent } from '../ModalContent';
import { ModalFooter } from '../ModalFooter';


export type ConfirmationModalProps = ModalProps & {
    message?: string;
    cancelButtonText?: string;
    confirmButtonText?: string;
    onConfirm?: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    message, cancelButtonText, confirmButtonText, onConfirm, onClose, ...props
}) => {
    const handleConfirm = () => {
        onConfirm?.();
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
                <Typography textId={'modal.confirmation.title'} />
            </ModalHeader>
            <ModalContent>
                <Typography textId={message ?? 'modal.confirmation.text'} />
            </ModalContent>
            <ModalFooter>
                <Button variant="secondary" onClick={handleCancel}>
                    <Typography textId={cancelButtonText ?? 'modal.confirmation.cancel'} />
                </Button>
                <Button onClick={handleConfirm}>
                    <Typography textId={confirmButtonText ?? 'modal.confirmation.confirm'} />
                </Button>
            </ModalFooter>
        </ModalBase>
    );
}
