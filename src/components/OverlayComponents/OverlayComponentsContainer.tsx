import { createElement, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useShallow } from 'zustand/shallow';

import { useOverlayComponentsStore } from '@/stores/OverlayComponentsStore';
import { KeyCodes } from '@/constants/keyboard';

import {
    addScrollbarPadding,
    getScrollbarWidth,
    isScrollbarVisible,
    removeScrollbarPadding
} from './utils';
import { OverlayComponentBase } from './types';


export const OverlayComponentsContainer: React.FC = () => {
    const {
        components,
        closeComponentById,
        closeLastComponent
    } = useOverlayComponentsStore(useShallow(({
            components,
            closeComponentById,
            closeLastComponent
        }) => ({
            components,
            closeComponentById,
            closeLastComponent
        })));

    const scrollbarWidth = useRef<number | null>(null);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [components]);

    useEffect(() => {
        if (components.length && isScrollbarVisible()) {
            const width = scrollbarWidth.current ?? getScrollbarWidth();
            scrollbarWidth.current = width;

            addScrollbarPadding(width);
        } else {
            removeScrollbarPadding();
        }
    }, [components]);

    const getZIndex = (index: number) => 100 + index * 10;

    const handleKeyDown = (event: KeyboardEvent) => {
        if (!components?.length) return;

        const lastComponent = components[components.length - 1];
        if (!lastComponent) return;

        const props = lastComponent.props as OverlayComponentBase ?? {};
        props.onKeyDown?.(event);

        switch (event.code) {
            case KeyCodes.Escape: {
                closeLastComponent();
                break;
            }
            default: return;
        }
    }

    const renderContent = () => {
        return components.map((component, index) => {
            const props = component.props as React.Attributes & OverlayComponentBase ?? {};

            props.onClose = (payload: unknown) => closeComponentById(component.id, payload);

            const element = createElement(component.component, props);

            return createPortal((
                <div key={index} style={{ zIndex: getZIndex(index), position: 'fixed' }}>
                    {element}
                </div>
            ), document.body);
        });
    };

    return (
        <>
            {renderContent()}
        </>
    );
}
