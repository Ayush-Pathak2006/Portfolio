import Button from "../../components/common/Button";

const HeroActions = () => {
    return (
        <div className="flex flex-wrap items-center gap-6">
            <Button href="#projects">
                View my work
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    ↘
                </span>
            </Button>

            <Button
                href="#contact"
                variant="secondary"
            >
                Let's talk ↗
            </Button>
        </div>
    );
};

export default HeroActions;