import { PropsWithChildren } from 'react';

import { Typography } from '@/components/Typography';
import { Row } from '@/components/Form/Row';
import { Label } from '@/components/Form/Label';
import { FeedbackWrapper } from '@/components/Form/Feedback/FeedbackWrapper';
import { Input } from '@/components/FormControls/Input';
import { Button } from '@/components/Button';

import { GoogleButton } from '../../components/GoogleButton/GoogleButton';
import { FormHeader } from '../../components/Header/FormHeader';
import { ActionPrompt } from '../../components/ActionPrompt/ActionPrompt';
import { OperationAlert } from '../../components/OperationAlert/OperationAlert';
import { AuthOperationStatus } from '../../types';
import { useRegistrationForm } from './useRegistrationForm';
import styles from '../../AuthModal.module.scss';


type Props = PropsWithChildren & {
    operationStatus: AuthOperationStatus;
    isLoading?: boolean;
    onPromptClick: () => void;
    onRegisterWithEmail: (email: string, password: string) => Promise<void>;
    onRegisterWithGoogle: () => Promise<void>;
}

export const RegistrationForm: React.FC<Props> = ({
    operationStatus, isLoading, onPromptClick, onRegisterWithEmail, onRegisterWithGoogle
}) => {
    const { values, isValid, errors, setFieldValue, validate } = useRegistrationForm();

    const handleRegisterWithEmailClick = async () => {
        if (!await validate()) return;

        const { email, password } = values;

        await onRegisterWithEmail(email, password);
    }

    return (
        <>
            <FormHeader 
                titleTextId="modal.auth.registration.title"
                subtitleTextId="modal.auth.registration.subtitle"
            />

            <Row>
                <Label>
                    <Typography textId="modal.auth.registration.email" />
                </Label>
                <FeedbackWrapper errors={errors.email}>
                    <Input
                        value={values.email}
                        invalid={!!errors.email}
                        placeholder="modal.auth.registration.email.placeholder"
                        onChange={e => setFieldValue('email', e.currentTarget.value)}
                    />
                </FeedbackWrapper>
            </Row>

            <Row>
                <Label>
                    <Typography textId="modal.auth.registration.password" />
                </Label>
                <FeedbackWrapper errors={errors.password}>
                    <Input
                        type="password"
                        value={values.password}
                        invalid={!!errors.password}
                        placeholder="modal.auth.registration.password.placeholder"
                        onChange={e => setFieldValue('password', e.currentTarget.value)}
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
                    onClick={handleRegisterWithEmailClick}
                >
                    <Typography textId="modal.auth.registration.button" />
                </Button>

                <GoogleButton onClick={onRegisterWithGoogle} />
            </div>

            <ActionPrompt
                promptTextId="modal.auth.registration.prompt.text"
                actionTextId="modal.auth.registration.prompt.action"
                onClick={onPromptClick}
            />
        </>
    );
}
