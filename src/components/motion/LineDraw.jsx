import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";

/** A rule that draws itself as you scroll past it. */
const LineDraw = ({ orientation = "horizontal", className, origin }) => {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const vertical = orientation === "vertical";

    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "end 45%"] });
    const scale = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
        stiffness: 120,
        damping: 30,
        mass: 0.4,
    });

    const base = cn("block bg-line-strong", vertical ? "h-full w-px" : "h-px w-full", className);

    return (
        <motion.span
            ref={ref}
            aria-hidden
            className={base}
            style={
                reduce
                    ? undefined
                    : {
                          transformOrigin: origin ?? (vertical ? "top" : "left"),
                          scaleY: vertical ? scale : 1,
                          scaleX: vertical ? 1 : scale,
                      }
            }
        />
    );
};

export default LineDraw;
