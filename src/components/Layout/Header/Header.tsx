import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';
import { MdLogout } from 'react-icons/md';

import { useAuthStore } from '@/stores/AuthStore';
import { useOverlayComponentsStore } from '@/stores/OverlayComponentsStore';
import { ROUTES } from '@/constants/routes';

import { Image } from '@/components/Image';
import { Typography } from '@/components/Typography';
import { Container } from '@/components/Container';
import { Breakpoints } from '@/constants/screen';
import { Button } from '@/components/Button';
import { AuthModal } from '@/components/OverlayComponents/Modals/AuthModal';

import styles from './Header.module.scss';


export const Header: FC = () => {
    const {
        user,
        logout
    } = useAuthStore(useShallow(({
            user,
            logout
        }) => ({
            user,
            logout
        })));

    const { showComponent } = useOverlayComponentsStore();

    const navigate = useNavigate();

    const handleAuthClick = () => {
        showComponent(AuthModal);
    }

    const handleMyQuizzesClick = () => {
        navigate(ROUTES.myQuizzes.get());
    }

    return (
        <header id="header" className={styles.header}>
            <Container className={styles.container} maxWidth={Breakpoints.XL}>
                <div className={styles.left}>
                    <Link to="/" className={styles.logo}>
                        <Image src='/logo.svg' />
                        <Typography>qTime</Typography>
                    </Link>
                </div>
                <div className={styles.right}>
                    {!!user ? (
                        <>
                            <Button onClick={handleMyQuizzesClick}>
                                <Typography textId="header.button.myQuizzes" />
                            </Button>

                            <Button
                                className={styles.logout}
                                variant="secondary"
                                onClick={logout}
                            >
                                <MdLogout />
                            </Button>
                        </>
                    ) : (
                        <Button onClick={handleAuthClick}>
                            <Typography textId="header.button.login" />
                        </Button>
                    )}
                </div>
            </Container>
        </header>
    );
}