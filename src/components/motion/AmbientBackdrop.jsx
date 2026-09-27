import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Two soft glows that travel as you scroll, so the page has a light source.
 * Sections are opaque, so this sits *above* content as a screen-blended,
 * pointer-events-none overlay at very low alpha.
 */
const AmbientBackdrop = () => {
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 30, mass: 0.8 });

    const accentY = useTransform(progress, [0, 1], ["-10%", "70%"]);
    const accentX = useTransform(progress, [0, 0.5, 1], ["65%", "25%", "70%"]);
    const mintY = useTransform(progress, [0, 1], ["90%", "5%"]);
    const mintX = useTransform(progress, [0, 0.5, 1], ["15%", "75%", "20%"]);
    const strength = useTransform(progress, [0, 0.12, 0.85, 1], [0.35, 1, 1, 0.4]);

    if (reduce) return null;

    return (
        <motion.div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[40] overflow-hidden"
            style={{ mixBlendMode: "screen", opacity: strength }}
        >
            <motion.div
                className="absolute h-[55vw] w-[55vw] rounded-full"
                style={{
                    top: accentY,
                    left: accentX,
                    x: "-50%",
                    y: "-50%",
                    background: "radial-gradient(circle, rgba(122,167,255,0.16), transparent 68%)",
                    filter: "blur(40px)",
                }}
            />
            <motion.div
                className="absolute h-[42vw] w-[42vw] rounded-full"
                style={{
                    top: mintY,
                    left: mintX,
                    x: "-50%",
                    y: "-50%",
                    background: "radial-gradient(circle, rgba(94,196,166,0.11), transparent 68%)",
                    filter: "blur(40px)",
                }}
            />
        </motion.div>
    );
};

export default AmbientBackdrop;
