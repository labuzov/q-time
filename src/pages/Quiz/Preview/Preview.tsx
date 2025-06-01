import { FC } from 'react';

import { Breakpoints } from '@/constants/screen';
import { useLoading } from '@/hooks/useLoading';

import { Image } from '@/components/Image';
import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';
import { Container } from '@/components/Container';

import styles from './Preview.module.scss';


const defaultImgUrl = 'https://bogatyr.club/uploads/posts/2023-03/26188/1678994928_bogatyr-club-p-fon-dlya-testa-foni-vkontakte-15.png';

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
            <div className={styles.image}>
                <Image src={src || defaultImgUrl} />
            </div>

            <div className={styles.content}>
                <Typography className={styles.title} variant="h3">{title}</Typography>
                <Typography className={styles.description}>{description}</Typography>
            </div>

            <div className={styles.actions}>
                <Button
                    disabled={isLoading}
                    onClick={handleStartClick}
                >
                    <Typography textId="quiz.button.start" />
                </Button>
            </div>
        </Container>
    );
}
