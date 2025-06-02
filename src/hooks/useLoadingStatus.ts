import { useState } from 'react';


type Status = 'none' | 'forbidden' | 'notFound' | 'error' | 'success';

export const useLoadingStatus = () => {
    const [status, setStatus] = useState<Status>('none');

    return {
        status,
        setStatus
    }
}