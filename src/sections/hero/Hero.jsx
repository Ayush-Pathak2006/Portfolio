import { motion, useScroll, useTransform } from "framer-motion";
import Container from "../../components/common/Container";
import Section from "../../components/common/Section";
import useReducedMotion from "../../hooks/useReducedMotion";
import HeroContent from "./HeroContent";
import HeroPortrait from "./HeroPortrait";

const Hero = () => {
    const prefersReducedMotion = useReducedMotion();
    const { scrollY } = useScroll();
    const hintOpacity = useTransform(scrollY, [0, 180], [1, 0]);

    return (
        <Section
            id="hero"
            spacing="hero"
            className="overflow-hidden pt-28 md:pt-32"
        >
            <Container>
                <div className="grid items-end gap-12 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] lg:gap-16">
                    <HeroContent />
                    <HeroPortrait />
                </div>

                <motion.p
                    className="mt-10 text-xs uppercase tracking-[0.22em] text-[var(--color-text-muted)]"
                    style={prefersReducedMotion ? undefined : { opacity: hintOpacity }}
                >
                    Scroll
                </motion.p>
            </Container>
        </Section>
    );
};

export default Hero;
