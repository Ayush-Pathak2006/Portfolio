import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

/** Counts up once, when it first enters view. Commits whole integers only. */
const ScrollCounter = ({ value, className, suffix = "", duration = 1.4, pad = 0 }) => {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const inView = useInView(ref, { once: true, amount: 0.6 });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!inView || reduce) return undefined;

        let raf = 0;
        let start = null;
        let last = -1;

        const tick = (now) => {
            if (start === null) start = now;
            const progress = Math.min(1, (now - start) / (duration * 1000));
            const next = Math.round(easeOutCubic(progress) * value);
            if (next !== last) {
                last = next;
                setDisplay(next);
            }
            if (progress < 1) raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [inView, reduce, value, duration]);

    const shown = reduce ? value : display;

    return (
        <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
            {pad ? String(shown).padStart(pad, "0") : shown}
            {suffix}
        </span>
    );
};

export default ScrollCounter;
