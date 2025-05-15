import { useRef, useState } from 'react';


export const useLoading = () => {
    const promiseList = useRef<PromiseLike<unknown>[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCompletedOnce, setIsCompletedOnce] = useState(false);

    function addToLoading<T>(callback: () => PromiseLike<T>) {
        const promise = callback();

        subscribe(promise);
        setIsLoading(!!promiseList.current.length);
        return promise;
    }

    function subscribe<T>(promise: PromiseLike<T>): PromiseLike<T> {
        if (promiseList.current.indexOf(promise) !== -1) {
            throw new Error('Promise is already registered!');
        }

        promiseList.current.push(promise);

        promise.then(() => complete(promise), () => complete(promise));
        return promise;
    }

    function complete(promise: PromiseLike<unknown>) {
        function timeout() {
            return new Promise((resolve) => {
                setTimeout(resolve, 0);
            });
        }

        timeout().then(() => {
            const index = promiseList.current.indexOf(promise);
            if (index === -1)
                throw new Error('Promise is not registered!');

            promiseList.current.splice(index, 1);
            setIsCompletedOnce(true);
            setIsLoading(!!promiseList.current.length);
        });
    }

    return { isLoading, isCompletedOnce, addToLoading };
}
