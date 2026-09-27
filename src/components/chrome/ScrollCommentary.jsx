import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useScrollTelemetry from "../../hooks/useScrollTelemetry";
import { EASE } from "../../lib/motion";
import { bottomQuips, idleQuips, marginWhispers, rageQuips } from "../../data/portfolio";

const VISIBLE_MS = 5200;

/**
 * A small aside in the bottom-left corner that reacts to *how* the page is
 * scrolled. Decorative: aria-hidden and pointer-events-none.
 */
const ScrollCommentary = () => {
    const { depth, isIdle, rageCount, reachedBottom } = useScrollTelemetry();
    const [message, setMessage] = useState(null);

    const shownWhispers = useRef(new Set());
    const lastRage = useRef(0);
    const shownBottom = useRef(false);
    const idleShownAt = useRef(-1);
    const hideTimer = useRef(null);
    const rotation = useRef(0);

    useEffect(() => () => clearTimeout(hideTimer.current), []);

    // Priority: idle > rage > bottom > depth.
    useEffect(() => {
        const show = (text) => {
            setMessage(text);
            clearTimeout(hideTimer.current);
            hideTimer.current = setTimeout(() => setMessage(null), VISIBLE_MS);
        };

        if (isIdle) {
            if (idleShownAt.current !== rotation.current) {
                idleShownAt.current = rotation.current;
                show(idleQuips[rotation.current % idleQuips.length]);
                rotation.current += 1;
            }
            return;
        }

        if (rageCount > lastRage.current) {
            lastRage.current = rageCount;
            show(rageQuips[(rageCount - 1) % rageQuips.length]);
            return;
        }

        if (reachedBottom && !shownBottom.current) {
            shownBottom.current = true;
            show(bottomQuips[rotation.current % bottomQuips.length]);
            rotation.current += 1;
            return;
        }

        for (let i = marginWhispers.length - 1; i >= 0; i -= 1) {
            if (depth >= marginWhispers[i].at && !shownWhispers.current.has(i)) {
                shownWhispers.current.add(i);
                show(marginWhispers[i].text);
                return;
            }
        }
    }, [depth, isIdle, rageCount, reachedBottom]);

    return (
        <div
            aria-hidden
            className="pointer-events-none fixed bottom-5 left-5 z-[47] hidden max-w-[15rem] sm:block md:bottom-7 md:left-7 md:max-w-[17rem]"
        >
            <AnimatePresence mode="wait">
                {message && (
                    <motion.p
                        key={message}
                        initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -6, filter: "blur(3px)" }}
                        transition={{ duration: 0.55, ease: EASE.out }}
                        className="border-l border-accent-dim pl-3 font-mono text-[10px] leading-relaxed tracking-wide text-mute md:text-[11px]"
                    >
                        {message}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ScrollCommentary;
