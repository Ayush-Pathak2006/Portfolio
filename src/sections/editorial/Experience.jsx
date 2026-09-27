import { motion } from "framer-motion";
import { experience, experienceAsides, sectionAsides } from "../../data/portfolio";
import { DUR, EASE } from "../../lib/motion";
import RevealText from "../../components/motion/RevealText";
import Parallax from "../../components/motion/Parallax";
import LineDraw from "../../components/motion/LineDraw";
import SectionHeader from "./SectionHeader";

const Experience = () => (
    <section id="experience" className="relative bg-black px-6 py-28 sm:px-10 md:px-16 md:py-40">
        <div className="mx-auto max-w-4xl">
            <SectionHeader title="Where I've Been" aside={sectionAsides.experience} className="mb-16 md:mb-24" />

            {/* A spine that draws itself down the timeline as you read it. */}
            <div className="relative flex flex-col gap-16 md:gap-24">
                <div className="pointer-events-none absolute bottom-0 left-[-1.25rem] top-0 hidden md:block">
                    <LineDraw orientation="vertical" />
                </div>

                {experience.map((entry, i) => (
                    <motion.div
                        key={entry.role}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.9, ease: EASE.out }}
                        className="flex flex-col gap-3 md:flex-row md:items-baseline md:gap-10"
                    >
                        {/* The big year drifts slowest — it reads as the layer furthest back. */}
                        <Parallax speed={0.42} distance={110} className="shrink-0 md:w-44">
                            <div className="flex flex-col">
                                <span className="font-display text-[16vw] italic leading-none text-lavender-dim sm:text-[9vw] md:text-[4vw]">
                                    {entry.year}
                                </span>
                                {entry.period && (
                                    <span className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-mute-dim">
                                        {entry.period}
                                    </span>
                                )}
                            </div>
                        </Parallax>

                        <div>
                            <RevealText
                                as="h3"
                                by="word"
                                amount={0.4}
                                duration={DUR.base}
                                pad={0.14}
                                className="block font-display text-2xl text-paper md:text-3xl"
                            >
                                {entry.role}
                            </RevealText>
                            <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-mute-dim">{entry.org}</p>
                            <p className="mt-3 max-w-md text-sm leading-relaxed text-mute md:text-base">{entry.detail}</p>
                            {experienceAsides[i] && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.9, delay: 0.45, ease: EASE.out }}
                                    className="mt-4 max-w-md border-l border-line-strong pl-3 font-mono text-[10px] leading-relaxed text-mute-dim"
                                >
                                    {experienceAsides[i]}
                                </motion.p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default Experience;
