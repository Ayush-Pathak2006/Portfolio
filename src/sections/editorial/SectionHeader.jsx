import { motion } from "framer-motion";
import { inView } from "../../lib/motion";
import { cn } from "../../lib/utils";

/** Small mono label on the left, a dry aside on the right. */
const SectionHeader = ({ title, aside, className }) => (
    <div className={cn("flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between", className)}>
        <motion.h2 {...inView()} className="font-mono text-xs uppercase tracking-[0.3em] text-mute-dim">
            {title}
        </motion.h2>
        {aside && (
            <motion.p
                {...inView(0.15, 12)}
                className="max-w-xs font-mono text-[11px] leading-relaxed text-mute-dim md:text-right"
            >
                {aside}
            </motion.p>
        )}
    </div>
);

export default SectionHeader;
