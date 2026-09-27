import { motion } from "framer-motion";
import { projectsIntro, sectionAsides } from "../../data/portfolio";
import { DUR, EASE } from "../../lib/motion";
import RevealText from "../../components/motion/RevealText";
import Parallax from "../../components/motion/Parallax";
import LineDraw from "../../components/motion/LineDraw";

const ProjectsIntro = () => (
    <section
        id="work"
        className="relative flex min-h-[60vh] flex-col items-start justify-center gap-4 bg-black px-6 sm:px-10 md:px-16"
    >
        {/* Revealed as lines, so the statement lands as a statement. */}
        <RevealText
            as="h2"
            by="line"
            amount={0.4}
            duration={DUR.slow}
            pad={0.2}
            className="font-display text-[13vw] italic leading-[0.9] text-paper sm:text-[9vw] md:text-[6.5vw]"
        >
            {projectsIntro.title}
        </RevealText>

        <Parallax speed={-0.18} distance={90} className="w-full">
            <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, delay: 0.35, ease: EASE.out }}
                className="font-mono text-[11px] italic text-mute-dim"
            >
                {projectsIntro.tagline}
            </motion.p>
        </Parallax>

        <div className="mt-10 flex w-full max-w-3xl flex-col gap-4">
            <LineDraw />
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.9, delay: 0.5, ease: EASE.out }}
                className="font-mono text-[11px] leading-relaxed text-mute-dim"
            >
                {sectionAsides.work}
            </motion.p>
        </div>
    </section>
);

export default ProjectsIntro;
