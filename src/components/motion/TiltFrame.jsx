import { motion } from "framer-motion";
import usePointerTilt from "../../hooks/usePointerTilt";

const TiltFrame = ({
    children,
    className = "",
    intensity = 9,
}) => {
    const tilt = usePointerTilt(intensity);

    return (
        <div
            className={`[perspective:1000px] ${className}`}
            onPointerMove={(event) => {
                if (event.pointerType !== "mouse") {
                    return;
                }

                tilt.onPointerMove(event);
            }}
            onPointerLeave={tilt.onPointerLeave}
        >
            <motion.div
                className="h-full w-full [transform-style:preserve-3d]"
                style={tilt.prefersReducedMotion ? undefined : tilt.style}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default TiltFrame;
