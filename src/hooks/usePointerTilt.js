import { useMotionValue, useSpring, useTransform } from "framer-motion";
import useReducedMotion from "./useReducedMotion";

const SPRING = {
    stiffness: 180,
    damping: 18,
    mass: 0.35,
};

const usePointerTilt = (intensity = 9) => {
    const prefersReducedMotion = useReducedMotion();
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(
        useTransform(y, [-0.5, 0.5], [intensity, -intensity]),
        SPRING
    );
    const rotateY = useSpring(
        useTransform(x, [-0.5, 0.5], [-intensity, intensity]),
        SPRING
    );
    const scale = useSpring(1, SPRING);

    const onPointerMove = (event) => {
        if (prefersReducedMotion) {
            return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left) / rect.width - 0.5);
        y.set((event.clientY - rect.top) / rect.height - 0.5);
        scale.set(1.035);
    };

    const onPointerLeave = () => {
        x.set(0);
        y.set(0);
        scale.set(1);
    };

    return {
        prefersReducedMotion,
        style: {
            rotateX,
            rotateY,
            scale,
        },
        onPointerMove,
        onPointerLeave,
    };
};

export default usePointerTilt;
