import { Canvas } from "@react-three/fiber";

const SceneCanvas = ({ children }) => {
    return (
        <Canvas
            camera={{
                position: [0, 0, 7],
                fov: 45,
            }}
            dpr={[1, 2]}
            gl={{
                antialias: true,
                alpha: true,
            }}
        >
            {children}
        </Canvas>
    );
};

export default SceneCanvas;