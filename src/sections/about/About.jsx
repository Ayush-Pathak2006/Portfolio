import Container from "../../components/common/Container";
import Section from "../../components/common/Section";

import Values from "./Values";
import { aboutContent } from "./about.config";

const About = () => {
    return (
        <Section
            id="about"
            className="py-20 md:py-24"
        >
            <Container>
                <div className="border-t border-[var(--color-border)] pt-6">
                    <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
                                {aboutContent.eyebrow}
                            </p>
                        </div>

                        <div>
                            <h2 className="max-w-4xl text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
                                A little
                                <br />
                                <span className="font-display font-normal text-[var(--color-text-secondary)]">
                                    about me.
                                </span>
                            </h2>

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

                            <Values values={aboutContent.values} />
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default About;