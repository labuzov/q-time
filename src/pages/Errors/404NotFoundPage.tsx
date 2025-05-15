import { FC } from 'react';

import { ErrorPage } from './ErrorPage';


export const NotFoundPage: FC = () => {

    return ( 
        <ErrorPage
            text="error.404.text"
            description="error.404.description"
            imageSrc="/assets/error_404.svg"
        />
    );
}
