import { ReactNode } from 'react';
import { ModalProps, ModalButton, Modal } from '../../Modals';


export type ConfirmationModalProps = ModalProps & {
    message?: string | ReactNode;
    cancelButtonText?: string;
    confirmButtonText?: string;
    onConfirm?: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    title, message, cancelButtonText, confirmButtonText, onConfirm, onClose, ...props
}) => {
    const handleConfirm = () => {
        onConfirm?.();
        onClose?.(true);
    }

    const handleCancel = () => {
        onClose?.(false);
    }

    const getButtons = () => {
        const buttons: ModalButton[] = [];

        const cancelText = cancelButtonText || 'Отмена';
        const confirmText = confirmButtonText || 'ОК';

        buttons.push({ text: cancelText, variant: 'outlineSecondary', onClick: handleCancel });
        buttons.push({ text: confirmText, onClick: handleConfirm });

        return buttons;
    }

    const modalTitle = title || 'Подтверждение';
    const modalMessage = message || 'Вы действительно хотите продолжить?';

    return (
        <Modal
            title={modalTitle}
            buttons={getButtons()}
            onClose={handleCancel}
            {...props}
        >
            {modalMessage}
        </Modal>
    );
}
