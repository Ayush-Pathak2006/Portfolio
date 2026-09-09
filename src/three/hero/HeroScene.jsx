import SceneCanvas from "../canvas/SceneCanvas";
import CameraController from "../shared/CameraController";
import Lighting from "../shared/Lighting";

import ArchitectureGraph from "./ArchitectureGraph";

const HeroScene = () => {
    return (
        <SceneCanvas>
            <CameraController />

            <Lighting />

            <ArchitectureGraph />
        </SceneCanvas>
    );
};

export default HeroScene;