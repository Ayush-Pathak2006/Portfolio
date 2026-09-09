import Container from "../../components/common/Container";
import Section from "../../components/common/Section";

import HeroContent from "./HeroContent";

const Hero = () => {
    return (
        <Section
            id="hero"
            className="flex min-h-[calc(100svh-2rem)] items-end pt-32"
        >
            <Container>
                <HeroContent />
            </Container>
        </Section>
    );
};

export default Hero;