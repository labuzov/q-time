import { FC } from 'react';

import { Breakpoints } from '@/constants/screen';

import { Container } from '@/components/Container';
import { Typography } from '@/components/Typography';
import { Image } from '@/components/Image';
import { Button } from '@/components/Button';

import styles from './Welcome.module.scss';


export const Welcome: FC = () => {

    return ( 
        <div className={styles.wrapper}>
            <Container maxWidth={Breakpoints.L} className={styles.container}>
                <div className={styles.text}>
                    <Typography
                        textId="home.welcome.text.primary"
                        variant="h1"
                    />
                    <Typography
                        textId="home.welcome.text.secondary"
                        variant="h4"
                        className={styles.textSecondary}
                    />
                    <Button
                        className={styles.button}
                    >
                        <Typography
                            textId="home.welcome.button"
                        />
                    </Button>
                </div>
                <div className={styles.image}>
                    <Image src="/assets/welcome.svg" />
                </div>
            </Container>
        </div>
    );
}
