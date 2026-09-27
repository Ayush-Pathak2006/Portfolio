import { useEffect, useRef, useState } from "react";
import {
    AnimatePresence,
    motion,
    useMotionTemplate,
    useReducedMotion,
    useScroll,
    useTransform,
} from "framer-motion";
import { heroStatusLines, heroTags, person } from "../../data/portfolio";
import useMediaQuery, { useFinePointer } from "../../hooks/useMediaQuery";
import { CURTAIN_CLEAR, DUR, EASE, STAGGER } from "../../lib/motion";
import RevealText from "../../components/motion/RevealText";

/**
 * Sticky hero: the wordmark rises, shrinks and softens as you scroll away,
 * while the portrait drifts down and scales up at its own rate.
 */
const Hero = () => {
    const ref = useRef(null);
    const [statusIdx, setStatusIdx] = useState(0);
    const reduce = useReducedMotion();
    const finePointer = useFinePointer();
    const wide = useMediaQuery("(min-width: 768px)");

    useEffect(() => {
        if (reduce) return undefined;
        const id = setInterval(() => setStatusIdx((prev) => (prev + 1) % heroStatusLines.length), 2800);
        return () => clearInterval(id);
    }, [reduce]);

    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

    const titleY = useTransform(scrollYProgress, [0, 1], [0, -140]);
    const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
    const titleOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0]);

    // Fraunces softens and goes wonky as the wordmark leaves. Desktop only.
    const opsz = useTransform(scrollYProgress, [0, 1], [124, 144]);
    const soft = useTransform(scrollYProgress, [0, 1], [0, 42]);
    const wonk = useTransform(scrollYProgress, (v) => (v > 0.4 ? 1 : 0));
    const titleAxes = useMotionTemplate`"opsz" ${opsz}, "SOFT" ${soft}, "WONK" ${wonk}`;

    const portraitY = useTransform(scrollYProgress, [0, 1], [0, 90]);
    const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
    const portraitOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

    const metaOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const metaY = useTransform(scrollYProgress, [0, 0.3], [0, -30]);

    // Three rates below the title, so the block separates instead of sliding as one slab.
    const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -96]);
    const pillsY = useTransform(scrollYProgress, [0, 0.6], [0, -54]);
    const statusY = useTransform(scrollYProgress, [0, 0.6], [0, -26]);

    const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
    const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

    const titleStyle = { y: titleY, scale: titleScale, opacity: titleOpacity };
    if (finePointer && wide && !reduce) titleStyle.fontVariationSettings = titleAxes;

    return (
        <section id="top" ref={ref} className="relative min-h-[100dvh] md:h-[190vh]">
            <div className="relative flex min-h-[100dvh] w-full flex-col justify-between px-6 pb-8 pt-24 sm:px-10 md:sticky md:top-0 md:h-screen md:flex-row md:items-center md:overflow-hidden md:px-16 md:py-0">
                <motion.div
                    style={{ opacity: bgOpacity }}
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(169,156,194,0.10),transparent_58%)]"
                />

                {/* Desktop portrait — offset right, overlapping the type column. */}
                <motion.div
                    style={{ y: portraitY, scale: portraitScale, opacity: portraitOpacity }}
                    className="hidden md:absolute md:right-[5%] md:top-[9%] md:block md:h-[82%] md:w-[36%] lg:right-[7%] lg:w-[33%]"
                >
                    <motion.div
                        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                        transition={{ duration: 1.4, delay: CURTAIN_CLEAR + 0.15, ease: EASE.inOut }}
                        className="relative h-full w-full overflow-hidden rounded-[14px] border border-white/[0.08] [isolation:isolate]"
                    >
                        <img
                            src={person.portrait}
                            alt={person.name}
                            className="h-full w-full object-cover object-[center_15%] contrast-[1.05] grayscale-[30%]"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </motion.div>
                </motion.div>

                <div className="relative z-10 w-full md:max-w-[62%] lg:max-w-[58%]">
                    <motion.div
                        style={{ opacity: metaOpacity, y: metaY }}
                        className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-mute sm:text-[11px] md:mb-6"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: DUR.base, delay: CURTAIN_CLEAR, ease: EASE.out }}
                            className="inline-block"
                        >
                            01 / {person.name.toUpperCase()}
                        </motion.span>
                    </motion.div>

                    <motion.h1
                        style={titleStyle}
                        className="origin-left font-display text-[17vw] font-light leading-[0.88] tracking-tight text-paper sm:text-[16vw] md:text-[14vw] lg:text-[13vw]"
                    >
                        <RevealText by="char" delay={CURTAIN_CLEAR} stagger={0.055} duration={1.1} pad={0.1}>
                            {person.first.toUpperCase()}
                        </RevealText>
                    </motion.h1>

                    <motion.p
                        style={{ y: subtitleY, opacity: titleOpacity }}
                        className="mt-2.5 max-w-md font-display text-[6.5vw] italic leading-[0.95] text-mute sm:text-[5.5vw] md:mt-4 md:text-[4vw] lg:text-[3.2vw]"
                    >
                        <RevealText by="word" delay={CURTAIN_CLEAR + 0.45} duration={DUR.base} pad={0.22}>
                            I build software.
                        </RevealText>
                    </motion.p>

                    <motion.div style={{ opacity: metaOpacity, y: pillsY }} className="mt-5 md:mt-10">
                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={{
                                hidden: {},
                                show: {
                                    transition: { staggerChildren: STAGGER.tight, delayChildren: CURTAIN_CLEAR + 0.7 },
                                },
                            }}
                            className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-mute-dim sm:gap-x-5 sm:text-[10px]"
                        >
                            {heroTags.map((label, i) => (
                                <motion.span
                                    key={label}
                                    variants={{
                                        hidden: { opacity: 0, y: 6 },
                                        show: { opacity: 1, y: 0, transition: { duration: DUR.fast, ease: EASE.out } },
                                    }}
                                    className="inline-flex items-center gap-x-3.5 sm:gap-x-5"
                                >
                                    {i > 0 && <span className="h-1 w-1 rounded-full bg-line-strong" />}
                                    {label}
                                </motion.span>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        style={{ opacity: metaOpacity, y: statusY }}
                        className="mt-4 flex min-h-[2.5rem] max-w-md items-center md:mt-6"
                    >
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={statusIdx}
                                initial={reduce ? false : { opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={reduce ? undefined : { opacity: 0 }}
                                transition={{ duration: reduce ? 0 : 0.35 }}
                                style={{ fontSize: "clamp(0.875rem, 1.15vw, 1.125rem)" }}
                                className="font-mono italic leading-relaxed tracking-wide text-mute-dim"
                            >
                                {heroStatusLines[statusIdx]}
                            </motion.p>
                        </AnimatePresence>
                    </motion.div>

                    {/* Mobile portrait sits beneath the content. */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: CURTAIN_CLEAR }}
                        className="relative mt-7 aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-xl border border-line-strong/60 shadow-2xl sm:max-w-[280px] md:hidden"
                    >
                        <img
                            src={person.portrait}
                            alt=""
                            className="h-full w-full object-cover object-[center_15%] contrast-[1.05] grayscale-[30%]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </motion.div>
                </div>

                <motion.div
                    style={{ opacity: cueOpacity }}
                    className="mt-6 flex flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-mute-dim md:absolute md:bottom-8 md:left-1/2 md:mt-0 md:-translate-x-1/2"
                >
                    <span>scroll</span>
                    <span className="relative hidden h-8 w-px overflow-hidden bg-line md:block">
                        {!reduce && (
                            <motion.span
                                className="absolute inset-x-0 top-0 block h-3 bg-paper/70"
                                animate={{ y: ["-100%", "320%"] }}
                                transition={{
                                    duration: 1.9,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: CURTAIN_CLEAR + 0.6,
                                }}
                            />
                        )}
                    </span>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
