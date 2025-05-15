import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Breakpoints } from '@/constants/screen';

import { Container } from '@/components/Container';
import { Typography } from '@/components/Typography';
import { Image } from '@/components/Image';
import { Button } from '@/components/Button';

import styles from './ErrorPage.module.scss';


type Props = {
    text?: string;
    description?: string;
    imageSrc?: string;
}

export const ErrorPage: FC<Props> = ({ text, description, imageSrc }) => {
    const navigate = useNavigate();

    const handleGoHomeClick = () => {
        navigate('/');
    }

    return ( 
        <Container maxWidth={Breakpoints.L} className={styles.container}>
            <div className={styles.image}>
                <Image src={imageSrc ?? '/assets/error_500.svg'} />
            </div>
            <div className={styles.text}>
                <Typography textId={text ?? 'error.default.text'} variant="h3" className={styles.title} />
                <Typography textId={description ?? 'error.default.description'} className={styles.description} />
            </div>
            <div className={styles.actions}>
                <Button onClick={handleGoHomeClick}>
                    <Typography textId={'error.button.goHome'} />
                </Button>
            </div>
        </Container>
    );
}
