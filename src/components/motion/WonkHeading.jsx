import { useRef } from "react";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";
import useMediaQuery, { useFinePointer } from "../../hooks/useMediaQuery";

const TAGS = {
    h2: motion.h2,
    h3: motion.h3,
    p: motion.p,
    span: motion.span,
};

/**
 * Morphs the Fraunces variable axes (opsz / SOFT / WONK) as the heading travels
 * through the viewport. Layout-affecting, so reserved for single-line display
 * words and switched off on touch devices.
 */
const WonkHeading = ({
    children,
    className,
    as = "h2",
    softRange = [0, 55],
    opszRange = [96, 144],
    wonkAt = 0.45,
}) => {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const finePointer = useFinePointer();
    const wideEnough = useMediaQuery("(min-width: 768px)");
    const morph = !reduce && finePointer && wideEnough;
    const Tag = TAGS[as];

    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const opsz = useTransform(scrollYProgress, [0, 0.5, 1], [opszRange[0], opszRange[1], opszRange[0]]);
    const soft = useTransform(scrollYProgress, [0, 0.5, 1], [softRange[0], softRange[1], softRange[0]]);
    const wonk = useTransform(scrollYProgress, (v) => (v > wonkAt ? 1 : 0));
    const fontVariationSettings = useMotionTemplate`"opsz" ${opsz}, "SOFT" ${soft}, "WONK" ${wonk}`;

    return (
        <Tag ref={ref} className={className} style={morph ? { fontVariationSettings } : undefined}>
            {children}
        </Tag>
    );
};

export default WonkHeading;
