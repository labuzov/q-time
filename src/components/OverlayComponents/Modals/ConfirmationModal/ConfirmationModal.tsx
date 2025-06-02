import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';

import { ModalProps, ModalBase } from '../../Modals';
import { ModalHeader } from '../ModalHeader';
import { ModalContent } from '../ModalContent';
import { ModalFooter } from '../ModalFooter';
import { JSX } from 'react';


export type ConfirmationModalProps = ModalProps & {
    cancelButtonText?: string;
    confirmButtonText?: string;
    onConfirm?: () => void;
    textRender?: () => JSX.Element;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    cancelButtonText, confirmButtonText, onConfirm, onClose, textRender, ...props
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
                {!!textRender ? (
                    <>
                        {textRender()}
                    </>
                ) : (
                    <Typography textId="modal.confirmation.text" />
                )}
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
