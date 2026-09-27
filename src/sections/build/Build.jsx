import DisplayHeading from "../../components/common/DisplayHeading";
import Reveal from "../../components/common/Reveal";
import SectionFrame from "../../components/common/SectionFrame";
import BuildPrinciples from "./BuildPrinciples";
import { buildContent } from "./build.config";

const Build = () => {
    return (
        <SectionFrame id="build" eyebrow={buildContent.eyebrow}>
            <Reveal>
                <DisplayHeading
                    primary={buildContent.title.primary}
                    secondary={buildContent.title.secondary}
                />

                <p className="mt-12 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)] md:text-lg md:leading-8">
                    {buildContent.intro}
                </p>
            </Reveal>

            <BuildPrinciples principles={buildContent.principles} />
        </SectionFrame>
    );
};

export default Build;
