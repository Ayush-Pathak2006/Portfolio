import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { DUR, EASE, STAGGER } from "../../lib/motion";
import { cn } from "../../lib/utils";
import RevealText from "../../components/motion/RevealText";
import Magnetic from "../../components/motion/Magnetic";
import ScrollCounter from "../../components/motion/ScrollCounter";

const toneMap = {
    accent: { text: "text-accent", border: "border-accent-dim/50", dot: "bg-accent" },
    mint: { text: "text-mint", border: "border-mint/40", dot: "bg-mint" },
    mute: { text: "text-mute", border: "border-line-strong", dot: "bg-mute" },
};

/** Staged text beats — the block assembles in order instead of arriving at once. */
const beat = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE.out } },
};

const beatGroup = {
    hidden: {},
    show: { transition: { staggerChildren: STAGGER.base, delayChildren: 0.1 } },
};

const GRID_TEXTURE = {
    backgroundImage:
        "linear-gradient(rgba(233, 235, 239,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(233, 235, 239,0.06) 1px, transparent 1px)",
    backgroundSize: "36px 36px",
};

/** One full-height scene per project: copy on one side, a screenshot that scales in on the other. */
const ProjectScene = ({ project, flip }) => {
    const [activeIdx, setActiveIdx] = useState(0);
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

    const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.86, 1, 1.08]);
    const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);
    const imgClip = useTransform(scrollYProgress, [0, 0.18], ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]);
    const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);

    const tone = toneMap[project.tone] ?? toneMap.mute;
    const title = project.title.join(" ");
    const primaryUrl = project.links[0]?.url;
    const image = project.images[activeIdx];

    return (
        <section
            ref={ref}
            className="relative flex min-h-screen items-center overflow-hidden bg-black px-6 py-24 sm:px-10 md:px-16"
        >
            <div
                className={cn(
                    "mx-auto flex w-full max-w-6xl flex-col gap-10 md:flex-row md:items-center md:gap-16",
                    flip && "md:flex-row-reverse"
                )}
            >
                <motion.div
                    style={{ y: textY }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.35 }}
                    variants={beatGroup}
                    className="relative z-10 md:w-[38%]"
                >
                    <motion.div variants={beat} className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs text-mute-dim">
                            {project.index} / <ScrollCounter value={project.tech.length} /> tools
                        </span>
                        {project.status && (
                            <span
                                className={cn(
                                    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider",
                                    tone.border,
                                    tone.text
                                )}
                            >
                                <span className={cn("h-1 w-1 animate-pulse rounded-full", tone.dot)} />
                                {project.status}
                            </span>
                        )}
                    </motion.div>

                    <RevealText
                        as="h3"
                        by="line"
                        delay={0.15}
                        amount={0.35}
                        duration={DUR.slow}
                        pad={0.18}
                        className="mt-4 block font-display text-[13vw] italic leading-[0.92] text-paper sm:text-[7vw] md:text-[4.4vw]"
                    >
                        {project.title}
                    </RevealText>

                    <motion.p variants={beat} className="mt-6 max-w-sm text-[15px] leading-relaxed text-mute md:text-base">
                        {project.description}
                    </motion.p>

                    {project.note && (
                        <motion.p
                            variants={beat}
                            className="mt-3 max-w-sm font-display text-xs italic leading-relaxed text-paper/75"
                        >
                            &ldquo;{project.note}&rdquo;
                        </motion.p>
                    )}

                    <motion.div
                        variants={{
                            hidden: {},
                            show: { transition: { staggerChildren: STAGGER.tight, delayChildren: 0.2 } },
                        }}
                        className="mt-6 flex flex-wrap gap-x-4 gap-y-2"
                    >
                        {project.tech.map((tech) => (
                            <motion.span
                                key={tech}
                                variants={{
                                    hidden: { opacity: 0, y: 12 },
                                    show: { opacity: 1, y: 0, transition: { duration: DUR.fast, ease: EASE.out } },
                                }}
                                className="font-mono text-[10px] uppercase tracking-[0.15em] text-mute-dim"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </motion.div>

                    <motion.div variants={beat} className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                        {project.links.map((link) => (
                            <Magnetic key={link.label} strength={0.35}>
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-cursor="LOOK"
                                    aria-label={`${link.label} for ${title} (opens in a new tab)`}
                                    className={cn(
                                        "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest underline-offset-4 transition-colors hover:underline",
                                        tone.text
                                    )}
                                >
                                    {link.label}
                                </a>
                            </Magnetic>
                        ))}
                    </motion.div>
                </motion.div>

                <motion.div
                    style={{ scale: imgScale, y: imgY, clipPath: imgClip }}
                    data-cursor="VIEW"
                    className={cn(
                        "group relative aspect-[4/3] w-full overflow-hidden border bg-graphite-2 md:w-[62%]",
                        tone.border
                    )}
                >
                    <div className="pointer-events-none absolute inset-0 z-10 opacity-25" style={GRID_TEXTURE} />

                    <div className="relative h-full w-full overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={image.src}
                                initial={{ opacity: 0, scale: 1.02 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="relative flex h-full w-full items-center justify-center p-3 pt-14 sm:p-5 sm:pt-16"
                            >
                                {image.kind === "mobile" ? (
                                    <div className="relative aspect-[9/19] h-full overflow-hidden rounded-2xl border border-line-strong bg-black shadow-2xl">
                                        <img
                                            src={image.src}
                                            alt={`${title} on mobile`}
                                            loading="lazy"
                                            className="h-full w-full object-cover object-top"
                                        />
                                    </div>
                                ) : (
                                    <div className="relative h-full w-full overflow-hidden rounded-lg border border-line-strong bg-black/80 shadow-2xl">
                                        <img
                                            src={image.src}
                                            alt={`${title} screenshot`}
                                            loading="lazy"
                                            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                                        />
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {primaryUrl && (
                            <a
                                href={primaryUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Open ${title} (opens in a new tab)`}
                                className="absolute inset-0 z-20 block"
                            />
                        )}
                    </div>

                    <div className="pointer-events-none absolute left-0 right-0 top-0 z-30 flex items-center justify-between p-4 sm:p-5">
                        <div className="flex items-center gap-2 rounded-full border border-line bg-black/60 px-3 py-1 backdrop-blur-md">
                            <span className={cn("h-2 w-2 rounded-full", tone.dot)} />
                            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/80">
                                {image.kind === "mobile" ? "Mobile" : "Live Preview"}
                            </span>
                        </div>

                        {project.images.length > 1 && (
                            <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-line bg-black/60 p-1 backdrop-blur-md">
                                {project.images.map((img, idx) => (
                                    <button
                                        key={img.src}
                                        type="button"
                                        onClick={() => setActiveIdx(idx)}
                                        aria-label={`View screenshot ${idx + 1}`}
                                        aria-pressed={activeIdx === idx}
                                        className={cn(
                                            "h-2 rounded-full transition-all",
                                            activeIdx === idx ? cn("w-5", tone.dot) : "w-2 bg-mute-dim/50 hover:bg-paper/60"
                                        )}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectScene;
