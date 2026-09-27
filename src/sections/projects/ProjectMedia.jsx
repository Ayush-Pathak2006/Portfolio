import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TiltFrame from "../../components/motion/TiltFrame";
import useReducedMotion from "../../hooks/useReducedMotion";

const ProjectMedia = ({ project }) => {
    const frameRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: frameRef,
        offset: ["start end", "end start"],
    });

    const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -4]);
    const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.94, 1, 0.97]);
    const y = useTransform(scrollYProgress, [0, 1], [36, -24]);

    return (
        <div ref={frameRef} className="relative mt-8 md:mt-10">
            <motion.div style={prefersReducedMotion ? undefined : { rotate, scale, y }}>
                <TiltFrame intensity={8}>
                    <div className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                        <img
                            src={project.image}
                            alt={`${project.title} product screenshot`}
                            className="aspect-[16/9] w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                        />
                    </div>
                </TiltFrame>
            </motion.div>

            {project.imageSecondary && (
                <div className="pointer-events-auto absolute -bottom-10 right-[6%] w-[28%] min-w-[7.5rem] max-w-[11rem] md:-bottom-12">
                    <TiltFrame intensity={12}>
                        <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
                            <img
                                src={project.imageSecondary}
                                alt={`${project.title} mobile screenshot`}
                                className="aspect-[9/16] w-full object-cover object-top"
                            />
                        </div>
                    </TiltFrame>
                    </div>
            )}
        </div>
    );
};

export default ProjectMedia;
