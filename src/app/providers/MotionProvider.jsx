import { MotionConfig } from "framer-motion";
import useReducedMotion from "../../hooks/useReducedMotion";

const MotionProvider = ({ children }) => {
    const prefersReducedMotion = useReducedMotion();

    return (
        <MotionConfig reducedMotion={prefersReducedMotion ? "always" : "never"}>
            {children}
        </MotionConfig>
    );
};

export default MotionProvider;
