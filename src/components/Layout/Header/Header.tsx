import { FC } from 'react';

import styles from './Header.module.scss';
import { Image } from '@/components/Image';
import { Typography } from '@/components/Typography';
import { Container } from '@/components/Container';
import { Breakpoints } from '@/constants/screen';
import { Button } from '@/components/Button';


export const Header: FC = () => {
    return (
        <header id="header" className={styles.header}>
            <Container className={styles.container} maxWidth={Breakpoints.XL}>
                <div className={styles.left}>
                    <div className={styles.logo}>
                        <Image src='/logo.svg' />
                        <Typography>qTime</Typography>
                    </div>
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