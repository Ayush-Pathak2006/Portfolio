import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const CameraController = () => {
    const target = useRef({
        x: 0,
        y: 0,
    });

    useFrame((state) => {
        const { mouse, camera } = state;

        target.current.x = mouse.x * 0.8;
        target.current.y = mouse.y * 0.5;

        camera.position.x +=
            (target.current.x - camera.position.x) * 0.04;

        camera.position.y +=
            (target.current.y - camera.position.y) * 0.04;

        camera.lookAt(0, 0, 0);
    });

    return null;
};

export default CameraController;