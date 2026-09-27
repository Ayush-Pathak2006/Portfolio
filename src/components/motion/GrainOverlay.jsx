import { useReducedMotion } from "framer-motion";

const NOISE =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** Film grain + vignette, so the black reads as printed ink rather than a flat fill. */
const GrainOverlay = () => {
    const reduce = useReducedMotion();

    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[45]">
            <div
                className="absolute inset-0"
                style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)" }}
            />
            <div
                className={reduce ? "absolute -inset-[80px]" : "absolute -inset-[80px] grain-drift"}
                style={{ opacity: 0.042, backgroundImage: NOISE, backgroundSize: "200px 200px" }}
            />
        </div>
    );
};

export default GrainOverlay;
