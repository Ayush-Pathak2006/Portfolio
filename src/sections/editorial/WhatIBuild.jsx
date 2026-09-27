import { Fragment } from "react";
import { motion } from "framer-motion";
import { buildCategories, sectionAsides } from "../../data/portfolio";
import { DUR, EASE, STAGGER } from "../../lib/motion";
import RevealText from "../../components/motion/RevealText";
import Parallax from "../../components/motion/Parallax";
import LineDraw from "../../components/motion/LineDraw";
import SectionHeader from "./SectionHeader";

const WhatIBuild = () => (
    <section id="build" className="relative bg-graphite px-6 py-28 sm:px-10 md:px-16 md:py-40">
        <div className="mx-auto max-w-5xl">
            <SectionHeader title="Things I Build" aside={sectionAsides.build} className="mb-16 md:mb-24" />

            <div className="flex flex-col">
                {buildCategories.map((category, i) => (
                    <Fragment key={category.index}>
                        {i > 0 && <LineDraw />}

                        <div className="flex flex-col gap-2 py-8 md:flex-row md:items-baseline md:gap-10 md:py-14">
                            {/* The index drifts slower than the title — that's what separates the rows. */}
                            <Parallax speed={0.3} distance={70} className="md:w-12">
                                <span className="font-mono text-xs text-lavender-dim">{category.index}</span>
                            </Parallax>

                            <div className="md:w-[38%]">
                                <RevealText
                                    as="h3"
                                    by="word"
                                    delay={0.05}
                                    duration={DUR.base}
                                    className="font-display text-[9vw] italic leading-none text-paper sm:text-[5vw] md:text-[3.4vw]"
                                >
                                    {category.title}
                                </RevealText>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.9, delay: 0.45, ease: EASE.out }}
                                    className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-mute-dim"
                                >
                                    {category.aside}
                                </motion.p>
                            </div>

                            <motion.div
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.4 }}
                                variants={{
                                    hidden: {},
                                    show: { transition: { staggerChildren: STAGGER.tight, delayChildren: 0.2 } },
                                }}
                                className="flex flex-1 flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-mute md:text-sm"
                            >
                                {category.lines.map((text) => (
                                    <motion.span
                                        key={text}
                                        variants={{
                                            hidden: { opacity: 0, y: 14 },
                                            show: {
                                                opacity: 1,
                                                y: 0,
                                                transition: { duration: DUR.fast, ease: EASE.out },
                                            },
                                        }}
                                    >
                                        {text}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    </section>
);

export default WhatIBuild;
