export type OverlayComponentBase = {
    open?: boolean;
    onClose?: (payload?: unknown) => void;
    onKeyDown?: (event: KeyboardEvent) => void;
}
