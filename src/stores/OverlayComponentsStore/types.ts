export type OverlayComponent = {
    id: string;
    component: React.FunctionComponent<unknown>;
    props: unknown;
}

export type OverlayComponentPromise = {
    componentId: string;
    resolve: (value: OverlayComponentPayload) => void;
    reject: (value: OverlayComponentPayload) => void;
}

export type OverlayComponentPayload = unknown;
