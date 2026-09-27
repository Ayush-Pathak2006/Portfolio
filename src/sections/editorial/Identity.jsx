import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { about } from "../../data/portfolio";
import { DUR, EASE, STAGGER } from "../../lib/motion";
import RevealText from "../../components/motion/RevealText";
import Parallax from "../../components/motion/Parallax";

const line = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE.out } },
};

/** The statement right after the hero — uncovered word by word to set the tone. */
const Identity = () => {
    const [idx, setIdx] = useState(0);
    const reduce = useReducedMotion();

    useEffect(() => {
        if (reduce) return undefined;
        const id = setInterval(() => setIdx((prev) => (prev + 1) % about.rotating.length), 3500);
        return () => clearInterval(id);
    }, [reduce]);

    return (
        <section id="about" className="relative bg-black px-6 py-32 sm:px-10 md:px-16 md:py-44">
            <div className="mx-auto max-w-4xl">
                <p className="font-display text-[9vw] font-light italic leading-[1.05] text-paper sm:text-[6vw] md:text-[4.2vw]">
                    <RevealText by="word" amount={0.3} duration={DUR.slow} pad={0.2}>
                        {about.statement}
                    </RevealText>
                </p>

                <Parallax speed={-0.12} distance={80}>
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={{
                            hidden: {},
                            show: { transition: { staggerChildren: STAGGER.base, delayChildren: 0.1 } },
                        }}
                        className="mt-10 flex flex-col gap-1 font-mono text-sm text-mute md:mt-14 md:text-base"
                    >
                        {about.lines.map((text) => (
                            <motion.p key={text} variants={line}>
                                {text}
                            </motion.p>
                        ))}

                        <motion.div variants={line} className="flex min-h-[1.5rem] items-center">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={idx}
                                    initial={reduce ? false : { opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={reduce ? undefined : { opacity: 0 }}
                                    transition={{ duration: reduce ? 0 : 0.45 }}
                                    className="text-accent"
                                >
                                    {about.rotating[idx]}
                                </motion.p>
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                </Parallax>
            </div>
        </section>
    );
};

export default Identity;
