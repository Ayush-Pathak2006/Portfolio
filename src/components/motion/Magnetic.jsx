import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { SPRING } from "../../lib/motion";
import { useFinePointer } from "../../hooks/useMediaQuery";
import { cn } from "../../lib/utils";

/**
 * Pulls its child toward the cursor, springs back on leave. Wrapper only —
 * it never intercepts clicks, focus, or keyboard activation of the child.
 */
const Magnetic = ({ children, strength = 0.3, className }) => {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const fine = useFinePointer();

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, SPRING.snap);
    const sy = useSpring(y, SPRING.snap);

    if (reduce || !fine) {
        return <span className={cn("inline-block", className)}>{children}</span>;
    }

    const onMove = (event) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.span
            ref={ref}
            className={cn("inline-block", className)}
            style={{ x: sx, y: sy }}
            onPointerMove={onMove}
            onPointerLeave={reset}
            onBlur={reset}
        >
            {children}
        </motion.span>
    );
};

export default Magnetic;
