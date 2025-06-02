import { FC } from 'react';

import { ErrorPage } from './ErrorPage';


export const ForbiddenPage: FC = () => {

    return ( 
        <ErrorPage
            text="error.403.text"
            description="error.403.description"
            imageSrc="/assets/error_403.svg"
        />
    );
}
