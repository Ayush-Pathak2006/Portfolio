import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

import { getAnimatedNodePosition } from "./nodeAnimation";

const ArchitectureNode = ({
    label,
    description,
    position,
    animation,
}) => {
    const groupRef = useRef(null);

    const [isHovered, setIsHovered] = useState(false);

    useFrame((state) => {
        if (!groupRef.current) {
            return;
        }

        const animatedPosition =
            getAnimatedNodePosition(
                position,
                animation,
                state.clock.elapsedTime
            );

        groupRef.current.position.set(
            animatedPosition[0],
            animatedPosition[1],
            animatedPosition[2]
        );
    });

    return (
        <group ref={groupRef}>
            <mesh
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
                scale={isHovered ? 1.3 : 1}
            >
                <sphereGeometry args={[0.22, 32, 32]} />

                <meshStandardMaterial
                    color="#d4d4d8"
                    emissive="#8b5cf6"
                    emissiveIntensity={
                        isHovered ? 1.8 : 0.15
                    }
                    roughness={0.4}
                    metalness={0.6}
                />
            </mesh>

            {isHovered && (
                <mesh>
                    <torusGeometry
                        args={[0.34, 0.015, 16, 64]}
                    />

                    <meshBasicMaterial
                        color="#8b5cf6"
                        transparent
                        opacity={0.8}
                    />
                </mesh>
            )}

            <Html
                distanceFactor={8}
                position={[0, 0.38, 0]}
                center
            >
                <div
                    className={`
                        pointer-events-none
                        whitespace-nowrap
                        rounded-full
                        border
                        px-3
                        py-1.5
                        text-xs
                        backdrop-blur-md
                        transition-all
                        duration-300
                        ${
                            isHovered
                                ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-white shadow-[0_0_20px_rgba(139,92,246,0.25)]"
                                : "border-[var(--color-border-subtle)] bg-black/30 text-[var(--color-text-secondary)]"
                        }
                    `}
                >
                    {label}
                </div>
            </Html>
        </group>
    );
};

export default ArchitectureNode;