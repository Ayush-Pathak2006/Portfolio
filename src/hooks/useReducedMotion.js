import { useEffect, useState } from "react";

const useReducedMotion = () => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
        if (typeof window === "undefined") {
            return false;
        }

        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        const updatePreference = () => {
            setPrefersReducedMotion(mediaQuery.matches);
        };

        updatePreference();

        mediaQuery.addEventListener(
            "change",
            updatePreference
        );

        return () => {
            mediaQuery.removeEventListener(
                "change",
                updatePreference
            );
        };
    }, []);

    return prefersReducedMotion;
};

export default useReducedMotion;