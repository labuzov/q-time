import { FC, PropsWithChildren } from 'react';

import styles from './Layout.module.scss';
import { Header } from './Header/Header';

type Props = PropsWithChildren;

export const Layout: FC<Props> = ({ children }) => {
    return (
        <>
            <Header />
            <div className={styles.content}>
                {children}
            </div>
        </>
    );
}