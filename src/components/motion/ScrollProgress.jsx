import { motion, useScroll, useSpring } from "framer-motion";
import useReducedMotion from "../../hooks/useReducedMotion";

const ScrollProgress = () => {
    const prefersReducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 90,
        damping: 24,
        restDelta: 0.001,
    });

    if (prefersReducedMotion) {
        return null;
    }

    return (
        <motion.div
            className="fixed left-0 top-0 z-[60] h-[2px] origin-left bg-[var(--color-accent)]"
            style={{ scaleX, width: "100%" }}
            aria-hidden="true"
        />
    );
};

export default ScrollProgress;
