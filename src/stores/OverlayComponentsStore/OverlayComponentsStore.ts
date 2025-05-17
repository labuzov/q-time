import { create } from 'zustand';

import { OverlayComponent, OverlayComponentPayload, OverlayComponentPromise } from './types';
import { generateOverlayComponentId } from './utils';


type OverlayComponentsState = {
    components: OverlayComponent[];
    promises: OverlayComponentPromise[];
    showComponent: <P, T>(component: React.FunctionComponent<P>, props?: P) => Promise<T>;
    closeComponentById: (id: string, payload?: OverlayComponentPayload) => void;
    closeLastComponent: (payload?: OverlayComponentPayload) => void;
}

export const useOverlayComponentsStore = create<OverlayComponentsState>((set, get) => ({
    components: [],
    promises: [],

    showComponent: async <P, T>(component: React.FunctionComponent<P>, props?: P) => {
        const id = generateOverlayComponentId();
        const overlayComponent: OverlayComponent = {
            id,
            component: component as React.FunctionComponent<unknown>,
            props
        };
    
        return new Promise<T>((resolve, reject) => {
            set(state => ({
                promises: [...state.promises, {
                    componentId: id,
                    resolve: resolve as (value: OverlayComponentPayload) => void,
                    reject: reject as (value: OverlayComponentPayload) => void
                }],
                components: [...state.components, overlayComponent]
            }));
        }).finally(() => {
            const byComponentId = (item: OverlayComponent) => item.id !== overlayComponent.id;
    
            set(state => ({
                components: state.components.filter(byComponentId)
            }));
        });
    },

    closeComponentById: (id: string, payload?: OverlayComponentPayload) => {
        set(state => {
            const promise = state.promises.find(i => i.componentId === id);
            promise?.resolve(payload);

            return {
                promises: state.promises.filter(i => i.componentId !== id)
            }
        });
    },

    closeLastComponent: (payload?: OverlayComponentPayload) => {
        const { components, closeComponentById } = get();

        if (!components.length) return;

        const lastComponent = components[components.length - 1];

        closeComponentById(lastComponent.id, payload);
    }
}));
