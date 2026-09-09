import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

const ArchitectureCore = ({
    label,
    description,
    position,
}) => {
    const coreRef = useRef(null);
    const innerRef = useRef(null);

    const [isHovered, setIsHovered] = useState(false);

    useFrame((state) => {
        if (!coreRef.current || !innerRef.current) {
            return;
        }

        const time = state.clock.elapsedTime;

        coreRef.current.rotation.x =
            time * 0.15;

        coreRef.current.rotation.y =
            time * 0.2;

        innerRef.current.rotation.x =
            -time * 0.2;

        innerRef.current.rotation.y =
            -time * 0.15;
    });

    return (
        <group position={position}>
            {/* Outer structure */}
            <mesh
                ref={coreRef}
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
                scale={isHovered ? 1.08 : 1}
            >
                <icosahedronGeometry
                    args={[0.55, 1]}
                />

                <meshStandardMaterial
                    color="#8b5cf6"
                    emissive="#8b5cf6"
                    emissiveIntensity={
                        isHovered ? 1.8 : 0.7
                    }
                    transparent
                    opacity={0.35}
                    wireframe
                />
            </mesh>

            {/* Inner core */}
            <mesh ref={innerRef}>
                <icosahedronGeometry
                    args={[0.32, 2]}
                />

                <meshStandardMaterial
                    color="#8b5cf6"
                    emissive="#8b5cf6"
                    emissiveIntensity={
                        isHovered ? 2.5 : 1
                    }
                    transparent
                    opacity={0.75}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>

            {/* Core label */}
            <Html
                distanceFactor={8}
                position={[0, 0.8, 0]}
                center
            >
                <div
                    className={`
                        pointer-events-none
                        whitespace-nowrap
                        rounded-full
                        border
                        px-4
                        py-2
                        text-xs
                        font-medium
                        tracking-wide
                        backdrop-blur-md
                        transition-all
                        duration-300
                        ${
                            isHovered
                                ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-white shadow-[0_0_30px_rgba(139,92,246,0.3)]"
                                : "border-[var(--color-border)] bg-black/50 text-[var(--color-text-primary)]"
                        }
                    `}
                >
                    {label}
                </div>
            </Html>
        </group>
    );
};

export default ArchitectureCore;