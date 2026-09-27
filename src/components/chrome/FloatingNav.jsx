import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { navLinks, person } from "../../data/portfolio";
import { lockScroll, unlockScroll } from "../../lib/scrollLock";
import { EASE } from "../../lib/motion";
import { cn } from "../../lib/utils";
import Magnetic from "../motion/Magnetic";

/** Centered pill nav: shrinks after the hero, hides on scroll down, returns on scroll up. */
const FloatingNav = () => {
    const { scrollY } = useScroll();
    const [shrink, setShrink] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [open, setOpen] = useState(false);
    const [activeHref, setActiveHref] = useState(null);
    const lastY = useRef(0);

    useMotionValueEvent(scrollY, "change", (value) => {
        setShrink(value > 80);
        // 8px threshold keeps it from flickering on small jitters.
        const delta = value - lastY.current;
        if (Math.abs(delta) > 8) {
            setHidden(delta > 0 && value > 260 && !open);
            lastY.current = value;
        }
    });

    useEffect(() => {
        if (!open) return undefined;
        lockScroll();
        return () => unlockScroll();
    }, [open]);

    // Highlight whichever nav target currently crosses the middle of the viewport.
    useEffect(() => {
        const entries = navLinks
            .map((link) => ({ href: link.href, el: document.getElementById(link.href.slice(1)) }))
            .filter((entry) => entry.el);
        if (!entries.length) return undefined;

        const visible = new Set();
        const observer = new IntersectionObserver(
            (records) => {
                for (const record of records) {
                    const match = entries.find((entry) => entry.el === record.target);
                    if (!match) continue;
                    if (record.isIntersecting) visible.add(match.href);
                    else visible.delete(match.href);
                }
                const found = [...entries].reverse().find((entry) => visible.has(entry.href));
                setActiveHref(found?.href ?? null);
            },
            { rootMargin: "-45% 0px -45% 0px" }
        );

        entries.forEach((entry) => observer.observe(entry.el));
        return () => observer.disconnect();
    }, []);

    const pad = shrink ? { left: 14, right: 8, y: 8 } : { left: 22, right: 10, y: 10 };

    return (
        <>
            <motion.nav
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 1.6, ease: EASE.out }}
                className="fixed left-1/2 top-5 z-50 -translate-x-1/2"
            >
                {/* Hide-on-scroll lives on this inner layer so it isn't stuck behind the entrance delay. */}
                <motion.div
                    animate={{ y: hidden ? -90 : 0, opacity: hidden ? 0 : 1 }}
                    transition={{ duration: 0.45, ease: EASE.out }}
                >
                    <motion.div
                        animate={{
                            paddingLeft: pad.left,
                            paddingRight: pad.right,
                            paddingTop: pad.y,
                            paddingBottom: pad.y,
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex items-center gap-6 rounded-full border border-line-strong bg-black/60 backdrop-blur-md sm:gap-8"
                    >
                        <Magnetic strength={0.25}>
                            <a
                                href="#top"
                                data-cursor="TOP"
                                className="font-display text-[13px] italic tracking-wide text-paper"
                            >
                                {person.first}
                            </a>
                        </Magnetic>

                        <div className="hidden items-center gap-6 sm:flex">
                            {navLinks.map((link) => {
                                const active = activeHref === link.href;
                                return (
                                    <Magnetic key={link.href} strength={0.3}>
                                        <a
                                            href={link.href}
                                            data-cursor="VIEW"
                                            aria-current={active ? "true" : undefined}
                                            className={cn(
                                                "relative font-mono text-[10px] uppercase tracking-[0.15em] transition-colors hover:text-paper",
                                                active ? "text-paper" : "text-mute"
                                            )}
                                        >
                                            {link.label}
                                            {active && (
                                                <motion.span
                                                    layoutId="navActiveDot"
                                                    className="absolute -bottom-1.5 left-1/2 block h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-accent"
                                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                                />
                                            )}
                                        </a>
                                    </Magnetic>
                                );
                            })}
                        </div>

                        <button
                            type="button"
                            aria-label="Open menu"
                            onClick={() => setOpen(true)}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-line-strong font-mono text-sm text-paper sm:hidden"
                        >
                            +
                        </button>
                    </motion.div>
                </motion.div>
            </motion.nav>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="fixed left-1/2 top-5 z-50 w-[86vw] max-w-xs -translate-x-1/2 rounded-3xl border border-line-strong bg-black/95 p-6 backdrop-blur-md sm:hidden"
                    >
                        <div className="mb-6 flex items-center justify-between">
                            <span className="font-display text-sm italic text-paper">{person.first}</span>
                            <button
                                type="button"
                                aria-label="Close menu"
                                onClick={() => setOpen(false)}
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-line-strong font-mono text-sm text-paper"
                            >
                                ×
                            </button>
                        </div>
                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={{
                                hidden: {},
                                show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
                            }}
                            className="flex flex-col gap-4"
                        >
                            {navLinks.map((link) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    variants={{
                                        hidden: { opacity: 0, x: -12 },
                                        show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE.out } },
                                    }}
                                    className="font-mono text-xs uppercase tracking-[0.15em] text-mute"
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default FloatingNav;
