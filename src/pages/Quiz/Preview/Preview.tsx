import { FC } from 'react';

import { Breakpoints } from '@/constants/screen';

import { Image } from '@/components/Image';
import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';
import { Container } from '@/components/Container';

import styles from './Preview.module.scss';


type Props = {
    title: string;
    description: string;
    src: string;
}

export const Preview: FC<Props> = ({ title, description, src }) => {

    return (
        <Container maxWidth={Breakpoints.S} className={styles.container}>
            <div className={styles.image}>
                <Image src={src} />
            </div>

            <div className={styles.content}>
                <Typography className={styles.title} variant="h3">{title}</Typography>
                <Typography className={styles.description}>{description}</Typography>
            </div>

            <div className={styles.actions}>
                <Button
                    
                >
                    <Typography textId="quiz.button.start" />
                </Button>
            </div>
        </Container>
    );
}
