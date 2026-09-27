import { AnimatePresence, motion } from "framer-motion";
import { describeDistance, footer, person } from "../../data/portfolio";
import useScrollTelemetry from "../../hooks/useScrollTelemetry";
import { DUR, EASE } from "../../lib/motion";
import LineDraw from "../motion/LineDraw";
import Magnetic from "../motion/Magnetic";
import WonkHeading from "../motion/WonkHeading";

const socials = [
    { label: "GitHub", href: person.github, cursor: "VIEW", external: true },
    { label: "LinkedIn", href: person.linkedin, cursor: "VIEW", external: true },
    { label: "Email", href: `mailto:${person.email}`, cursor: "SAY HI", external: false },
];

/** The scroll-distance colophon line. Renders nothing until there's a real number. */
const ScrollStats = () => {
    const { distancePx } = useScrollTelemetry({ distanceStep: 1200 });

    return (
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute-dim">
            <AnimatePresence mode="wait" initial={false}>
                {distancePx > 600 && (
                    <motion.span
                        key={distancePx}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.4, ease: EASE.out }}
                        className="inline-block"
                    >
                        You have scrolled {describeDistance(distancePx)}
                    </motion.span>
                )}
            </AnimatePresence>
        </span>
    );
};

const Footer = () => (
    <footer className="relative border-t border-line bg-black px-6 py-14 sm:px-10 md:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: DUR.base, ease: EASE.out }}
            >
                <WonkHeading
                    as="span"
                    opszRange={[72, 144]}
                    softRange={[0, 60]}
                    wonkAt={0.5}
                    className="block font-display text-4xl italic text-paper md:text-5xl"
                >
                    {person.first}
                </WonkHeading>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mute-dim">
                    Full Stack · AI / ML · {person.location}
                </p>
            </motion.div>

            <div className="flex gap-6 font-mono text-xs uppercase tracking-[0.15em] text-mute">
                {socials.map((social) => (
                    <Magnetic key={social.label} strength={0.4}>
                        <a
                            href={social.href}
                            data-cursor={social.cursor}
                            {...(social.external ? { target: "_blank", rel: "noreferrer" } : {})}
                            className="hover:text-paper"
                        >
                            {social.label}
                        </a>
                    </Magnetic>
                ))}
            </div>
        </div>

        <div className="mx-auto mt-12 max-w-6xl">
            <LineDraw />
        </div>

        <div className="mx-auto mt-6 flex max-w-6xl flex-col gap-3 text-mute-dim md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[13px] italic leading-relaxed text-mute-dim md:text-[14px]">
                    {footer.line}
                </span>
                <span className="font-mono text-[12px] italic leading-relaxed text-mute-dim/70 md:text-[13px]">
                    {footer.sub}
                </span>
                <ScrollStats />
            </div>
            <span className="font-mono text-[10px]">
                © {person.year} {person.name}
            </span>
        </div>
    </footer>
);

export default Footer;
