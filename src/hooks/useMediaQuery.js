import { useCallback, useSyncExternalStore } from "react";

/**
 * Live media-query subscription. useSyncExternalStore (rather than a one-off
 * read in an effect) means resizing past a breakpoint or toggling OS reduced
 * motion updates the component immediately.
 */
const useMediaQuery = (query) => {
    const subscribe = useCallback(
        (onChange) => {
            const mql = window.matchMedia(query);
            mql.addEventListener("change", onChange);
            return () => mql.removeEventListener("change", onChange);
        },
        [query]
    );

    return useSyncExternalStore(
        subscribe,
        () => window.matchMedia(query).matches,
        () => false
    );
};

/** Pointer is a real mouse — hover and fine positioning are meaningful. */
export const useFinePointer = () => useMediaQuery("(pointer: fine)");

export default useMediaQuery;
