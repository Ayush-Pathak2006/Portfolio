import Container from "../../components/common/Container";
import Section from "../../components/common/Section";

import HeroContent from "./HeroContent";

const Hero = () => {
    return (
        <Section
            id="hero"
            className="flex min-h-screen items-center overflow-hidden pt-32"
        >
            <Container>
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    <HeroContent />

                    <div className="relative hidden aspect-square lg:block">
                        {/* Three.js scene will live here */}
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default Hero;