import { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { notificationConfig } from '@/constants/notificationConfig';


export const NotificationsContainer: FC = () => {
    return <ToastContainer {...notificationConfig.container} />;
}
