import { AlertVariant } from '@/components/Alert';

export const enum AuthModalForm {
    Login,
    Registration,
    ResetPassword
}

export type AuthOperationStatus = null | {
    text: string;
    variant: AlertVariant;
}