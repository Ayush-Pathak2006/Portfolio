import Container from "../../components/common/Container";
import Section from "../../components/common/Section";

import BuildPrinciples from "./BuildPrinciples";
import { buildContent } from "./build.config";

const Build = () => {
    return (
        <Section
            id="build"
            className="py-20 md:py-24"
        >
            <Container>
                <div className="border-t border-[var(--color-border)] pt-6">
                    <div className="grid gap-10 md:gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
                                {buildContent.eyebrow}
                            </p>
                        </div>

                        <div>
                            <h2 className="max-w-4xl text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
                                {buildContent.title.primary}
                                <br />
                                <span className="font-display font-normal text-[var(--color-text-secondary)]">
                                    {buildContent.title.secondary}
                                </span>
                            </h2>

                            <p className="mt-12 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)] md:text-lg md:leading-8">
                                {buildContent.intro}
                            </p>

                            <BuildPrinciples
                                principles={buildContent.principles}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default Build;