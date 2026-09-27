import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer } from "../../hooks/useMediaQuery";

/**
 * Dot cursor that swells over interactive elements and shows a label for any
 * ancestor with `data-cursor="LABEL"`. Fine pointers only.
 */
const CustomCursor = () => {
    const enabled = useFinePointer();
    const [visible, setVisible] = useState(false);
    const [label, setLabel] = useState(null);
    const [hovering, setHovering] = useState(false);
    const [isInput, setIsInput] = useState(false);

    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const sx = useSpring(x, { stiffness: 450, damping: 35, mass: 0.35 });
    const sy = useSpring(y, { stiffness: 450, damping: 35, mass: 0.35 });

    useEffect(() => {
        if (!enabled) return undefined;

        document.documentElement.classList.add("cursor-ready");

        let lastLabel = null;
        let lastHover = false;
        let lastInput = false;

        // State only changes when hover/label/input status flips — no per-frame renders.
        const onMove = (event) => {
            x.set(event.clientX);
            y.set(event.clientY);
            setVisible(true);

            const target = event.target;
            if (!(target instanceof Element)) return;

            const cursorTarget = target.closest("[data-cursor]");
            const nextLabel = cursorTarget?.getAttribute("data-cursor") || null;
            const interactive = target.closest("a, button, [role='button'], input, textarea, select, label");
            const nextHover = Boolean(cursorTarget || interactive);
            const nextInput = Boolean(target.closest("input, textarea"));

            if (nextLabel !== lastLabel) {
                lastLabel = nextLabel;
                setLabel(nextLabel);
            }
            if (nextHover !== lastHover) {
                lastHover = nextHover;
                setHovering(nextHover);
            }
            if (nextInput !== lastInput) {
                lastInput = nextInput;
                setIsInput(nextInput);
            }
        };

        const onLeave = () => setVisible(false);
        const onEnter = () => setVisible(true);

        window.addEventListener("mousemove", onMove, { passive: true });
        document.addEventListener("mouseleave", onLeave);
        document.addEventListener("mouseenter", onEnter);

        return () => {
            window.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseleave", onLeave);
            document.removeEventListener("mouseenter", onEnter);
            document.documentElement.classList.remove("cursor-ready");
        };
    }, [enabled, x, y]);

    if (!enabled) return null;

    const size = label ? (label.length > 4 ? 64 : 52) : hovering ? 20 : 8;

    return (
        <motion.div
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[99999] flex items-center justify-center"
            style={{
                x: sx,
                y: sy,
                translateX: "-50%",
                translateY: "-50%",
                opacity: visible && !isInput ? 1 : 0,
            }}
        >
            <motion.div
                animate={{
                    width: size,
                    height: size,
                    backgroundColor: label
                        ? "var(--color-accent)"
                        : hovering
                          ? "rgba(233, 235, 239, 0.2)"
                          : "var(--color-paper)",
                    // rgba with zero alpha, not "transparent" — motion can't tween keywords.
                    borderColor: hovering && !label ? "var(--color-accent)" : "rgba(122, 167, 255, 0)",
                    scale: hovering && !label ? 1.25 : 1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="flex items-center justify-center rounded-full border border-transparent shadow-sm"
            >
                {label && <span className="font-mono text-[9px] font-medium tracking-widest text-black">{label}</span>}
            </motion.div>
        </motion.div>
    );
};

export default CustomCursor;
