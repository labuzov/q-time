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
import { useLoginForm } from './useLoginForm';
import styles from '../../AuthModal.module.scss';


type Props = PropsWithChildren & {
    isLoading?: boolean;
    onPromptClick: () => void;
    onResetPasswordClick: () => void;
    onLoginWithEmail: (email: string, password: string) => Promise<void>;
    onLoginWithGoogle: () => Promise<void>;
}

export const LoginForm: React.FC<Props> = ({
    isLoading,
    onPromptClick, onResetPasswordClick, onLoginWithEmail, onLoginWithGoogle
}) => {
    const { values, isValid, errors, setFieldValue, validate } = useLoginForm();

    const handleLoginWithEmailClick = async () => {
        if (!await validate()) return;

        const { email, password } = values;

        await onLoginWithEmail(email, password);
    }

    return (
        <>
            <FormHeader 
                titleTextId="modal.auth.login.title"
                subtitleTextId="modal.auth.login.subtitle"
            />

            <Row>
                <Label>
                    <Typography textId="modal.auth.login.email" />
                </Label>
                <FeedbackWrapper errors={errors.email}>
                    <Input
                        type="email"
                        value={values.email}
                        isInvalid={!!errors.email}
                        placeholder="modal.auth.login.email.placeholder"
                        onChange={e => setFieldValue('email', e.currentTarget.value)}
                    />
                </FeedbackWrapper>
            </Row>

            <Row>
                <Label>
                    <Typography textId="modal.auth.login.password" />
                </Label>
                <FeedbackWrapper errors={errors.password}>
                    <Input
                        type="password"
                        value={values.password}
                        isInvalid={!!errors.password}
                        placeholder="modal.auth.login.password.placeholder"
                        onChange={e => setFieldValue('password', e.currentTarget.value)}
                    />
                </FeedbackWrapper>
            </Row>

            <div className={styles.resetPassword}>
                <Typography
                    textId="modal.auth.reset.password"
                    variant="caption"
                    className={styles.resetPasswordText}
                    onClick={onResetPasswordClick}
                />
            </div>

            <div className={styles.buttons}>
                <Button
                    className={styles.button}
                    disabled={!isValid || isLoading}
                    onClick={handleLoginWithEmailClick}
                >
                    <Typography textId="modal.auth.login.button" />
                </Button>

                <GoogleButton onClick={onLoginWithGoogle} />
            </div>

            <ActionPrompt
                promptTextId="modal.auth.login.prompt.text"
                actionTextId="modal.auth.login.prompt.action"
                onClick={onPromptClick}
            />
        </>
    );
}
