import { ToastContainerProps, ToastOptions } from 'react-toastify';


type NotificationConfig = {
    options: ToastOptions;
    container: ToastContainerProps;
}

export const notificationConfig: NotificationConfig = {
    options: {
        closeOnClick: true,
        draggable: true,
        autoClose: 3000
    },
    container: {
        position: 'bottom-right'
    }
}
