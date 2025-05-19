import { PropsWithChildren } from 'react';

import { Typography } from '@/components/Typography';
import { Row } from '@/components/Form/Row';
import { Label } from '@/components/Form/Label';
import { FeedbackWrapper } from '@/components/Form/Feedback/FeedbackWrapper';
import { Input } from '@/components/FormControls/Input';
import { Button } from '@/components/Button';

import { FormHeader } from '../../components/Header/FormHeader';
import { ActionPrompt } from '../../components/ActionPrompt/ActionPrompt';
import { OperationAlert } from '../../components/OperationAlert/OperationAlert';
import { AuthOperationStatus } from '../../types';
import { useResetPasswordForm } from './useResetPasswordForm';
import styles from '../../AuthModal.module.scss';


type Props = PropsWithChildren & {
    operationStatus: AuthOperationStatus;
    isLoading?: boolean;
    onPromptClick: () => void;
    onPasswordReset: (email: string) => Promise<void>;
}

export const ResetPasswordForm: React.FC<Props> = ({
    operationStatus, isLoading, onPromptClick, onPasswordReset
}) => {
    const { values, isValid, errors, setFieldValue, validate } = useResetPasswordForm();

    const handlePasswordResetClick = async () => {
        if (!await validate()) return;

        const { email } = values;

        await onPasswordReset(email);
    }

    return (
        <>
            <FormHeader 
                titleTextId="modal.auth.reset.title"
                subtitleTextId="modal.auth.reset.subtitle"
            />

            <Row>
                <Label>
                    <Typography textId="modal.auth.reset.email" />
                </Label>
                <FeedbackWrapper errors={errors.email}>
                    <Input
                        value={values.email}
                        invalid={!!errors.email}
                        placeholder="modal.auth.reset.email.placeholder"
                        onChange={e => setFieldValue('email', e.currentTarget.value)}
                    />
                </FeedbackWrapper>
            </Row>

            {!!operationStatus && (
                <OperationAlert textId={operationStatus.text} variant={operationStatus.variant} />
            )}

            <div className={styles.buttons}>
                <Button
                    className={styles.button}
                    disabled={!isValid || isLoading}
                    onClick={handlePasswordResetClick}
                >
                    <Typography textId="modal.auth.reset.button" />
                </Button>
            </div>

            <ActionPrompt
                promptTextId="modal.auth.reset.prompt.text"
                actionTextId="modal.auth.reset.prompt.action"
                onClick={onPromptClick}
            />
        </>
    );
}
