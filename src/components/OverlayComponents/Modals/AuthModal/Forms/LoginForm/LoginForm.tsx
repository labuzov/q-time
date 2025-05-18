import { PropsWithChildren } from 'react';

import styles from '../../AuthModal.module.scss';
import { Typography } from '@/components/Typography';
import { Row } from '@/components/Form/Row';
import { Label } from '@/components/Form/Label';
import { FeedbackWrapper } from '@/components/Form/Feedback/FeedbackWrapper';
import { Input } from '@/components/FormControls/Input';
import { Button } from '@/components/Button';
import { GoogleButton } from '../../components/GoogleButton/GoogleButton';
import { FormHeader } from '../../components/Header/FormHeader';
import { ActionPrompt } from '../../components/ActionPrompt/ActionPrompt';


type Props = PropsWithChildren & {
    onLogin?: () => void;
}

export const LoginForm: React.FC<Props> = ({ onLogin }) => {

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
                <FeedbackWrapper>
                    <Input />
                </FeedbackWrapper>
            </Row>

            <Row>
                <Label>
                    <Typography textId="modal.auth.login.password" />
                </Label>
                <FeedbackWrapper>
                    <Input type="password" />
                </FeedbackWrapper>
            </Row>

            <div className={styles.buttons}>
                <Button className={styles.button}>
                    <Typography textId="modal.auth.login.button" />
                </Button>

                <GoogleButton />
            </div>

            <ActionPrompt
                promptTextId="modal.auth.login.prompt.text"
                actionTextId="modal.auth.login.prompt.action"
            />
        </>
    );
}
