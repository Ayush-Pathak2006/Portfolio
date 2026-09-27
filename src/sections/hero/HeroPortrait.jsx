import { motion, useScroll, useTransform } from "framer-motion";
import TiltFrame from "../../components/motion/TiltFrame";
import useReducedMotion from "../../hooks/useReducedMotion";
import { personal } from "../../data/personal";

const HeroPortrait = () => {
    const prefersReducedMotion = useReducedMotion();
    const { scrollY } = useScroll();
    const scale = useTransform(scrollY, [0, 480], [1, 1.18]);
    const y = useTransform(scrollY, [0, 480], [0, 96]);
    const rotate = useTransform(scrollY, [0, 480], [0, -8]);

    return (
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <TiltFrame intensity={7}>
                <motion.div
                    className="overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)]"
                    style={prefersReducedMotion ? undefined : { scale, y, rotate }}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                >
                    <img
                        src={personal.portrait}
                        alt={`${personal.name} standing on a staircase`}
                        className="h-[min(68vh,620px)] w-full object-cover object-[center_12%]"
                    />
                </motion.div>
            </TiltFrame>

            <p className="mt-4 text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                {personal.name} · {personal.location}
            </p>
        </div>
    );
};

export default HeroPortrait;
