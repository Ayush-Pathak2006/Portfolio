import Button from "../../components/common/Button";

const HeroActions = () => {
    return (
        <div className="mt-10 flex flex-wrap gap-4">
            <Button href="#projects">
                View my work
                <span className="ml-2">→</span>
            </Button>

            <Button
                href="#contact"
                variant="secondary"
            >
                Let's talk
            </Button>
        </div>
    );
};

export default HeroActions;