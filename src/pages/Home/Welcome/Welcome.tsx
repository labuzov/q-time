import { FC } from 'react';

import { Breakpoints } from '@/constants/screen';

import { Container } from '@/components/Container';
import { Typography } from '@/components/Typography';
import { Image } from '@/components/Image';
import { Button } from '@/components/Button';

import styles from './Welcome.module.scss';
import { InViewAnimation } from '@/components/InViewAnimation';


export const Welcome: FC = () => {

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
