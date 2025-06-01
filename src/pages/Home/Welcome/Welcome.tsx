import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { Breakpoints } from '@/constants/screen';
import { useAuthStore } from '@/stores/AuthStore';
import { useOverlayComponentsStore } from '@/stores/OverlayComponentsStore';

import { AuthModal, AuthModalProps } from '@/components/OverlayComponents/Modals/AuthModal';
import { InViewAnimation } from '@/components/InViewAnimation';
import { Typography } from '@/components/Typography';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { Image } from '@/components/Image';

import styles from './Welcome.module.scss';


export const Welcome: FC = () => {
    const { user } = useAuthStore();
    const { showComponent } = useOverlayComponentsStore();
    const navigate = useNavigate();

    const handleCreateClick = async () => {
        if (!user) {
            const isAuth = await showComponent<AuthModalProps, boolean>(AuthModal);
            if (!isAuth) return;
        }

        navigate(ROUTES.quizEditor.get());
    }

    return ( 
        <div className={styles.wrapper}>
            <Container maxWidth={Breakpoints.L} className={styles.container}>
                <div className={styles.text}>
                    <InViewAnimation variant="translateLeft">
                        <Typography
                            textId="home.welcome.text.primary"
                            variant="h1"
                        />
                        <Typography
                            textId="home.welcome.text.secondary"
                            variant="h4"
                            className={styles.textSecondary}
                        />
                    </InViewAnimation>
                    <InViewAnimation variant="translateTop" delay={0.6}>
                        <Button
                            className={styles.button}
                            onClick={handleCreateClick}
                        >
                            <Typography
                                textId="home.welcome.button"
                            />
                        </Button>
                    </InViewAnimation>
                </div>
                <InViewAnimation variant="translateTop" delay={0.3}>
                    <div className={styles.image}>
                        <Image src="/assets/welcome.svg" />
                    </div>
                </InViewAnimation>
            </Container>
        </div>
    );
}
