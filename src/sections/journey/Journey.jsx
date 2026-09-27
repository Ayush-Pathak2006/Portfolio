import DisplayHeading from "../../components/common/DisplayHeading";
import Reveal from "../../components/common/Reveal";
import SectionFrame from "../../components/common/SectionFrame";
import Timeline from "./Timeline";
import { journeyContent } from "./journey.config";

const Journey = () => {
    return (
        <SectionFrame id="journey" eyebrow={journeyContent.eyebrow}>
            <Reveal>
                <DisplayHeading
                    primary={journeyContent.title.primary}
                    secondary={journeyContent.title.secondary}
                />
            </Reveal>

            <Timeline entries={journeyContent.entries} />
        </SectionFrame>
    );
};

export default Journey;
