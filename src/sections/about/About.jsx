import DisplayHeading from "../../components/common/DisplayHeading";
import Reveal from "../../components/common/Reveal";
import SectionFrame from "../../components/common/SectionFrame";
import Values from "./Values";
import { aboutContent } from "./about.config";

const About = () => {
    return (
        <SectionFrame id="about" eyebrow={aboutContent.eyebrow}>
            <Reveal>
                <DisplayHeading
                    primary={aboutContent.title.primary}
                    secondary={aboutContent.title.secondary}
                />

                <div className="mt-12 max-w-2xl space-y-6">
                    {aboutContent.intro.map((paragraph) => (
                        <p
                            key={paragraph}
                            className="text-base leading-7 text-[var(--color-text-secondary)] md:text-lg md:leading-8"
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>
            </Reveal>

            <Values values={aboutContent.values} />
        </SectionFrame>
    );
};

export default About;
