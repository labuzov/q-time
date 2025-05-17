import { OverlayComponentPayload } from '@/stores/OverlayComponentsStore';


export type OverlayComponentBase = {
    onClose?: (payload?: OverlayComponentPayload) => void;
    onKeyDown?: (event: KeyboardEvent) => void;
}
