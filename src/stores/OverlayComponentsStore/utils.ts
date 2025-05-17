export const generateOverlayComponentId = () => {
    return Math.random().toString(36).substring(2, 8);
};