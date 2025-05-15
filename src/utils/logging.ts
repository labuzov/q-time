export const logError = (message?: string) => {
    if (!message) return;

    console.error(message);
}