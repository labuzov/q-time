import { toast } from 'react-toastify';

import { notificationConfig } from '@/constants/notificationConfig';
import i18n from '@/i18n/i18n';


const { options } = notificationConfig;

const getNotificationMessage = (message: string) => {
    return i18n.t(message, { defaultValue: 'error.unknown' });
}

export const showErrorNotification = (message: string) => {
    toast.error(getNotificationMessage(message), options);
}

export const showInfoNotification = (message: string) => {
    toast.info(getNotificationMessage(message), options);
}

export const showWarningNotification = (message: string) => {
    toast.warning(getNotificationMessage(message), options);
}

export const showSuccessNotification = (message: string) => {
    toast.success(getNotificationMessage(message), options);
}

export const clearNotifications = () => {
    toast.clearWaitingQueue();
}
