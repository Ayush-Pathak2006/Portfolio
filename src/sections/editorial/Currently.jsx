import { motion } from "framer-motion";
import { currently, currentlyAside, sectionAsides } from "../../data/portfolio";
import { DUR, EASE, STAGGER } from "../../lib/motion";
import RevealText from "../../components/motion/RevealText";
import LineDraw from "../../components/motion/LineDraw";
import SectionHeader from "./SectionHeader";

const Currently = () => (
    <section id="currently" className="relative bg-graphite px-6 py-28 sm:px-10 md:px-16 md:py-36">
        <div className="mx-auto max-w-4xl">
            <SectionHeader title="Currently" aside={currentlyAside} className="mb-14 md:mb-20" />

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                {currently.map((item, i) => {
                    // Cells arrive along the diagonal of the 2×2 grid, not in reading order.
                    const diagonal = Math.floor(i / 2) + (i % 2);
                    return (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ duration: 0.7, delay: diagonal * STAGGER.loose, ease: EASE.out }}
                        >
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-dim">
                                {item.label}
                            </span>
                            <RevealText
                                as="p"
                                by="word"
                                delay={diagonal * STAGGER.loose}
                                amount={0.5}
                                duration={DUR.base}
                                pad={0.2}
                                className="mt-2 block font-display text-2xl italic text-paper md:text-3xl"
                            >
                                {item.value}
                            </RevealText>
                        </motion.div>
                    );
                })}
            </div>

            <div className="mt-16 flex flex-col gap-4">
                <LineDraw />
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: EASE.out }}
                    className="font-mono text-[11px] leading-relaxed text-mute-dim"
                >
                    {sectionAsides.currently}
                </motion.p>
            </div>
        </div>
    </section>
);

export default Currently;
