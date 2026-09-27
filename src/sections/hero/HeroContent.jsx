import { motion } from "framer-motion";
import { heroContent } from "./hero.config";
import HeroActions from "./HeroActions";
import { fadeInUp, staggerContainer } from "../../lib/animations";

const HeroContent = () => {
    return (
        <motion.div
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
        >
            <motion.div
                className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]"
                variants={fadeInUp}
            >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                <span>{heroContent.eyebrow}</span>
            </motion.div>

            <motion.h1
                className="text-[clamp(3rem,7.4vw,7.25rem)] font-semibold leading-[0.88] tracking-[-0.055em]"
                variants={fadeInUp}
            >
                {heroContent.headline.primary}
                <span className="font-display font-normal text-[var(--color-text-secondary)]">
                    {" "}
                    {heroContent.headline.accent}
                </span>
                {heroContent.headline.rest.map((line) => (
                    <span key={line}>
                        <br />
                        {line}
                    </span>
                ))}
            </motion.h1>

            <motion.div
                className="mt-10 flex flex-col gap-8 border-t border-[var(--color-border)] pt-8"
                variants={fadeInUp}
            >
                <p className="max-w-xl text-base leading-7 text-[var(--color-text-secondary)] md:text-lg">
                    {heroContent.description}
                </p>

                <HeroActions />
            </motion.div>
        </motion.div>
    );
};

export default HeroContent;
