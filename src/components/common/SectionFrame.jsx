import Container from "./Container";
import Section from "./Section";

const SectionFrame = ({
    id,
    eyebrow,
    spacing = "default",
    children,
}) => {
    return (
        <Section id={id} spacing={spacing}>
            <Container>
                <div className="border-t border-[var(--color-border)] pt-6">
                    <div className="grid gap-10 md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
                            {eyebrow}
                        </p>
                        <div>{children}</div>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default SectionFrame;
