import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

import ArchitectureNode from "./ArchitectureNode";
import ConnectionLine from "./ConnectionLine";

import ArchitectureCore from "./ArchitectureCore";

import {
    architectureNodes,
    architectureConnections,
} from "../../sections/hero/hero.config";

const ArchitectureGraph = () => {
    const graphRef = useRef(null);

    const nodeMap = Object.fromEntries(
        architectureNodes.map((node) => [
            node.id,
            node,
        ])
    );

    useFrame((state) => {
        if (!graphRef.current) {
            return;
        }

        const { mouse } = state;

        const targetRotationX = mouse.y * 0.12;
        const targetRotationY = mouse.x * 0.18;

        graphRef.current.rotation.x +=
            (targetRotationX - graphRef.current.rotation.x) *
            0.04;

        graphRef.current.rotation.y +=
            (targetRotationY - graphRef.current.rotation.y) *
            0.04;
    });

    return (
        <group ref={graphRef}>
            {architectureConnections.map(
                (connection) => {
                    const source =
                        nodeMap[connection.source];

                    const target =
                        nodeMap[connection.target];

                    return (
                        <ConnectionLine
                            key={`${connection.source}-${connection.target}`}
                            source={source}
                            target={target}
                        />
                    );
                }
            )}

            {architectureNodes.map((node) => {
                if (node.type === "core") {
                    return (
                    <ArchitectureCore
                    key={node.id}
                    {...node}
                    />
                );
            }

            return (
                <ArchitectureNode
                    key={node.id}
                    {...node}
                />
            );
        })}
        </group>
    );
};

export default ArchitectureGraph;