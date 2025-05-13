import { CSSProperties } from 'react';

import { ButtonVariant } from '@/components/Button';


export type ModalButton = {
    text: string;
    title?: string;
    variant?: ButtonVariant;
    isDisabled?: boolean;
    isLoading?: boolean;
    alignLeft?: boolean;
    style?: CSSProperties;
    onClick?: () => Promise<void> | void;
}
