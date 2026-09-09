import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import { getAnimatedNodePosition } from "./nodeAnimation";

const ConnectionLine = ({
    source,
    target,
}) => {
    const lineRef = useRef(null);

    const sourceVector = useRef(
        new THREE.Vector3()
    );

    const targetVector = useRef(
        new THREE.Vector3()
    );

    useFrame((state) => {
        if (!lineRef.current) {
            return;
        }

        const sourcePosition =
            getAnimatedNodePosition(
                source.position,
                source.animation,
                state.clock.elapsedTime
            );

        const targetPosition =
            getAnimatedNodePosition(
                target.position,
                target.animation,
                state.clock.elapsedTime
            );

        sourceVector.current.set(
            sourcePosition[0],
            sourcePosition[1],
            sourcePosition[2]
        );

        targetVector.current.set(
            targetPosition[0],
            targetPosition[1],
            targetPosition[2]
        );

        lineRef.current.geometry.setPositions([
            sourceVector.current.x,
            sourceVector.current.y,
            sourceVector.current.z,

            targetVector.current.x,
            targetVector.current.y,
            targetVector.current.z,
        ]);
    });

    return (
        <Line
            ref={lineRef}
            points={[
                source.position,
                target.position,
            ]}
            color="#8b5cf6"
            transparent
            opacity={0.3}
            lineWidth={1}
        />
    );
};

export default ConnectionLine;