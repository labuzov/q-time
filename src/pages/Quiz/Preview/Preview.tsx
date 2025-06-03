import { FC } from 'react';

import { Breakpoints } from '@/constants/screen';
import { useLoading } from '@/hooks/useLoading';

import { Image } from '@/components/Image';
import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';
import { Container } from '@/components/Container';

import styles from './Preview.module.scss';
import { InViewAnimation } from '@/components/InViewAnimation';


type Props = {
    title: string;
    description: string;
    src: string;
    onStart: () => Promise<void>;
}

export const Preview: FC<Props> = ({ title, description, src, onStart }) => {
    const { isLoading, addToLoading } = useLoading();

    const handleStartClick = () => {
        addToLoading(onStart);
    }

    return (
        <Container maxWidth={Breakpoints.M} className={styles.container}>
            <InViewAnimation className={styles.image} variant="opacity">
                <Image src={src} />
            </InViewAnimation>

            <InViewAnimation className={styles.content} variant="translateLeft" delay={0.2}>
                <Typography className={styles.title} variant="h3">{title}</Typography>
                <Typography className={styles.description}>{description}</Typography>
            </InViewAnimation>

            <InViewAnimation className={styles.actions} variant="translateTop" delay={0.4}>
                <Button
                    disabled={isLoading}
                    onClick={handleStartClick}
                >
                    <Typography textId="quiz.button.start" />
                </Button>
            </InViewAnimation>
        </Container>
    );
}
