import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "../../lib/motion";
import { person } from "../../data/portfolio";

const loaderLines = [
    "Preparing a useful corner of the internet.",
    "Convincing the pixels to cooperate.",
    "Checking that production is still alive.",
    "Making this look more intentional than it was.",
    "Warming up the database. Politely.",
    "Loading unnecessary attention to detail.",
];

const DURATION = 1100;

/** Counts to 100, then lifts away like a curtain. */
const Loader = ({ onDone }) => {
    const [count, setCount] = useState(0);
    const [line] = useState(() => loaderLines[Math.floor(Math.random() * loaderLines.length)]);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const finish = () => {
            setDone(true);
            onDone?.();
        };

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            const id = setTimeout(finish, 0);
            return () => clearTimeout(id);
        }

        const start = performance.now();
        let raf;
        let timeout;
        const tick = (now) => {
            const progress = Math.min(1, (now - start) / DURATION);
            setCount(Math.floor(progress * 100));
            if (progress < 1) raf = requestAnimationFrame(tick);
            else timeout = setTimeout(finish, 200);
        };
        raf = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(timeout);
        };
    }, [onDone]);

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: EASE.inOut }}
                    className="fixed inset-0 z-[1000] flex select-none flex-col items-center justify-center overflow-hidden bg-black px-6 text-center"
                >
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.06] blur-[120px]"
                    />

                    {/* Type leaves first, then the panel lifts — a staged curtain call. */}
                    <motion.div
                        exit={{ y: -44, opacity: 0 }}
                        transition={{ duration: 0.34, ease: EASE.out }}
                        className="relative flex flex-col items-center"
                    >
                        <span
                            className="inline-block overflow-hidden align-bottom"
                            style={{ paddingBottom: "0.18em", marginBottom: "-0.18em" }}
                        >
                            <motion.span
                                initial={{ y: "110%" }}
                                animate={{ y: "0%" }}
                                transition={{ duration: 0.9, ease: EASE.out }}
                                className="inline-block font-display text-2xl italic text-paper md:text-3xl"
                            >
                                {person.first}
                            </motion.span>
                        </span>

                        <motion.p
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.25 }}
                            className="mt-4 max-w-md font-mono text-xs italic tracking-wide text-mute md:text-sm"
                        >
                            {line}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                            className="mt-6 flex flex-col items-center gap-2.5"
                        >
                            <span className="relative block h-px w-40 bg-line">
                                <span
                                    className="absolute inset-0 origin-left bg-paper/70"
                                    style={{ transform: `scaleX(${count / 100})` }}
                                />
                            </span>
                            <span
                                className="font-mono text-[10px] uppercase tracking-[0.3em] text-mute-dim"
                                style={{ fontVariantNumeric: "tabular-nums" }}
                            >
                                {String(count).padStart(2, "0")} — 100
                            </span>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Loader;
