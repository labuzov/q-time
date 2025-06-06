import { ModalProps, ModalBase } from '..';
import { ModalHeader } from '../ModalHeader';
import { ModalContent } from '../ModalContent';
import { LoginForm } from './Forms/LoginForm/LoginForm';
import { useAuthModal } from './useAuthModal';
import { AuthModalForm } from './types';
import { RegistrationForm } from './Forms/RegistrationForm/RegistrationForm';
import { ResetPasswordForm } from './Forms/ResetPasswordForm/ResetPasswordForm';
import styles from './AuthModal.module.scss';


export type AuthModalProps = ModalProps;

export const AuthModal: React.FC<AuthModalProps> = ({
    onClose, ...props
}) => {
    const {
        currentForm, isLoading,
        changeCurrentForm, loginWithEmail, loginWithGoogle,
        registerWithEmail, sendPasswordResetEmail
    } = useAuthModal(handleAuth);

    function handleCancel() {
        onClose?.(false);
    }

    function handleAuth() {
        onClose?.(true);
    }

    const renderContent = () => {
        switch (currentForm) {
            case AuthModalForm.Login: return (
                <LoginForm
                    isLoading={isLoading}
                    onLoginWithEmail={loginWithEmail}
                    onLoginWithGoogle={loginWithGoogle}
                    onResetPasswordClick={() => changeCurrentForm(AuthModalForm.ResetPassword)}
                    onPromptClick={() => changeCurrentForm(AuthModalForm.Registration)}
                />
            )
            case AuthModalForm.Registration: return (
                <RegistrationForm
                    isLoading={isLoading}
                    onRegisterWithEmail={registerWithEmail}
                    onRegisterWithGoogle={loginWithGoogle}
                    onPromptClick={() => changeCurrentForm(AuthModalForm.Login)}
                />
            )
            case AuthModalForm.ResetPassword: return (
                <ResetPasswordForm
                    isLoading={isLoading}
                    onPasswordReset={sendPasswordResetEmail}
                    onPromptClick={() => changeCurrentForm(AuthModalForm.Login)}
                />
            )
            default: return null;
        }
    }

    return (
        <ModalBase onClose={handleCancel} width={540} {...props}>
            <ModalHeader
                onClose={handleCancel}
            />
            <ModalContent>
                <div className={styles.content}>
                    {renderContent()}
                </div>
            </ModalContent>
        </ModalBase>
    );
}
