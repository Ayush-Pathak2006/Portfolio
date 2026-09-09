import Container from "../../components/common/Container";
import Section from "../../components/common/Section";

import Timeline from "./Timeline";
import { journeyContent } from "./journey.config";

const Journey = () => {
    return (
        <Section
            id="journey"
            className="py-20 md:py-24"
        >
            <Container>
                <div className="border-t border-[var(--color-border)] pt-6">
                    <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
                                {journeyContent.eyebrow}
                            </p>
                        </div>

                        <div>
                            <h2 className="max-w-4xl text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
                                The road
                                <br />
                                <span className="font-display font-normal text-[var(--color-text-secondary)]">
                                    so far.
                                </span>
                            </h2>

                            <Timeline entries={journeyContent.entries} />
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default Journey;