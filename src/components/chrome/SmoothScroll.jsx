import { useEffect } from "react";
import Lenis from "lenis";
import { registerScroller } from "../../lib/scrollLock";

/**
 * Weighted wheel scrolling via Lenis. Skipped on touch and reduced motion.
 * Lenis moves the real scrollTop, so framer-motion's useScroll stays in sync.
 */
const SmoothScroll = () => {
    useEffect(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const coarse = window.matchMedia("(pointer: coarse)").matches;
        if (reduced || coarse) return undefined;

        const lenis = new Lenis({
            duration: 1.25,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            wheelMultiplier: 0.92,
            touchMultiplier: 1.4,
            anchors: true,
        });
        registerScroller(lenis);

        let rafId;
        const raf = (time) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            registerScroller(null);
            lenis.destroy();
        };
    }, []);

    return null;
};

export default SmoothScroll;
