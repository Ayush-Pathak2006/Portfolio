import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import useMediaQuery, { useFinePointer } from "../../hooks/useMediaQuery";
import { cn } from "../../lib/utils";

/**
 * Pins a viewport-height stage and converts vertical scroll into horizontal
 * travel across the track. Degrades to a plain swipeable strip on touch,
 * narrow screens, or reduced motion.
 *
 * runway: extra scroll beyond the horizontal distance, in viewport heights.
 */
const PinnedRail = ({ children, className, runway = 0.6 }) => {
    const sectionRef = useRef(null);
    const viewportRef = useRef(null);
    const trackRef = useRef(null);
    const reduce = useReducedMotion();
    const fine = useFinePointer();
    const wide = useMediaQuery("(min-width: 1024px)");
    const enabled = fine && wide;
    const [distance, setDistance] = useState(0);

    useEffect(() => {
        const track = trackRef.current;
        const viewport = viewportRef.current;
        if (!track || !viewport) return undefined;
        const measure = () => setDistance(Math.max(0, track.scrollWidth - viewport.clientWidth));
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(track);
        observer.observe(viewport);
        return () => observer.disconnect();
    }, [children, enabled]);

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
    const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
    const x = useSpring(rawX, { stiffness: 160, damping: 30, mass: 0.4 });

    const active = enabled && !reduce && distance > 0;

    // One tree, no branching: the scroll target and measured nodes must stay
    // mounted across the mode flip.
    return (
        <div
            ref={sectionRef}
            style={active ? { height: `calc(100vh + ${distance}px + ${runway * 100}vh)` } : undefined}
            className={className}
        >
            <div
                ref={viewportRef}
                className={cn(
                    active
                        ? "sticky top-0 flex h-screen items-center overflow-hidden"
                        : "no-scrollbar w-full overflow-x-auto"
                )}
            >
                <motion.div ref={trackRef} className="flex w-max" style={active ? { x } : undefined}>
                    {children}
                </motion.div>
            </div>
        </div>
    );
};

export default PinnedRail;
