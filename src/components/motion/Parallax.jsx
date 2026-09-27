import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

const TAGS = {
    div: motion.div,
    span: motion.span,
    p: motion.p,
};

/**
 * Scroll-linked depth. Nest these at different speeds inside one section and
 * the layers separate.
 *
 * speed: positive drifts slower than scroll (sits further back), negative leads.
 * distance: travel in px at speed 1.
 */
const Parallax = ({ children, speed = 0.25, className, as = "div", spring = true, distance = 140 }) => {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const Tag = TAGS[as];

    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const raw = useTransform(scrollYProgress, [0, 1], [speed * distance, speed * -distance]);
    const smoothed = useSpring(raw, { stiffness: 140, damping: 30, mass: 0.4 });

    return (
        <Tag ref={ref} className={className} style={reduce ? undefined : { y: spring ? smoothed : raw }}>
            {children}
        </Tag>
    );
};

export default Parallax;
