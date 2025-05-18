import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Image } from '@/components/Image';
import { Typography } from '@/components/Typography';
import { Container } from '@/components/Container';
import { Breakpoints } from '@/constants/screen';
import { Button } from '@/components/Button';

import styles from './Header.module.scss';


export const Header: FC = () => {
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
                    <Button>
                        <Typography textId="header.button.login" />
                    </Button>
                </div>
            </Container>
        </header>
    );
}