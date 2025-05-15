import { FC } from 'react';
import { FaGithub } from 'react-icons/fa';

import { Breakpoints } from '@/constants/screen';

import { Container } from '@/components/Container';

import styles from './Footer.module.scss';
import { Typography } from '@/components/Typography';


export const Footer: FC = () => {

    return ( 
        <div className={styles.wrapper}>
            <Container maxWidth={Breakpoints.L} className={styles.container}>
                <Typography variant="caption" className={styles.name}>Developed by Sergey Labuzov</Typography>
                <div className={styles.links}>
                    <div className={styles.link}>
                        <FaGithub className={styles.linkIcon} />
                        <Typography variant="caption" className={styles.linkDescription}>
                            GitHub -
                            <a href="https://github.com/labuzov" target="_blank" rel="noopener noreferrer">https://github.com/labuzov</a>
                        </Typography>
                    </div>
                </div>
            </Container>
        </div>
    );
}
