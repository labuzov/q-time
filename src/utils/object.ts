export const getDeepCopy = <T,>(object: T): T => {
    return JSON.parse(JSON.stringify(object));
}